import React, { Component } from 'react';
import { compose } from 'recompose';
import {
    AuthUserContext,
    withAuthorization,
} from '../Session';
import { withFirebase } from '../Firebase';
import StockDataDashboard from '../StockDataDasboard';
import PageContainer from '../PageContainer';
import NewsDashbord from '../NewsDashbord';

const HomePage = () => (
    <PageContainer>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>


        <AuthUserContext.Consumer>
            {authUser => (
                <StockDataDashboard authUser={authUser} />
            )}
        </AuthUserContext.Consumer>
        
        <NewsDashbord />

        <Messages />

    </PageContainer>
);

class MessagesBase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            loading: false,
            messages: [],
        };
    }

    onChangeText = event => {
        this.setState({ text: event.target.value });
    };

    onCreateMessage = (event, authUser) => {

        this.props.firebase.messages().push({
            text: this.state.text,
            userId: authUser.uid,
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
        });

        this.setState({ text: '' });
        event.preventDefault();
    };

    onRemoveMessage = uid => {
        this.props.firebase.message(uid).remove();
    };

    onEditMessage = (message, text) => {
        const { uid, ...messageSnapshot } = message;

        this.props.firebase.message(message.uid).set({
            ...messageSnapshot,
            text,
            editedAt: this.props.firebase.serverValue.TIMESTAMP,
        });
    };

    componentDidMount() {
        this.setState({ loading: true });

        this.props.firebase.messages().on('value', snapshot => {

            const messageObject = snapshot.val();

            if (messageObject) {

                const messageList = Object.keys(messageObject).map(key => ({
                    ...messageObject[key],
                    uid: key,
                }));

                this.setState({
                    messages: messageList,
                    loading: false,
                });
            } else {
                this.setState({ messages: null, loading: false });
            }
        });
    }
    componentWillUnmount() {
        this.props.firebase.messages().off();
    }
    render() {
        const { text, messages, loading } = this.state;

        return (
            <AuthUserContext.Consumer>
                {authUser => (
                    <div>
                        {loading && <div>Loading ...</div>}

                        {messages ? (
                            <MessageList
                                authUser={authUser}
                                messages={messages}
                                onEditMessage={this.onEditMessage}
                                onRemoveMessage={this.onRemoveMessage}
                            />
                        ) : (
                            <div>There are no messages ...</div>
                        )}

                        <form onSubmit={event => this.onCreateMessage(event, authUser)}>
                            <input
                                type="text"
                                value={text}
                                onChange={this.onChangeText}
                            />
                            <button type="submit">Send</button>
                        </form>

                    </div>
                )}
            </AuthUserContext.Consumer>
        );

    }
}

const MessageList = ({ authUser, messages, onEditMessage, onRemoveMessage }) => (
    <ul>
        {messages.map(message => (
            <MessageItem
                authUser={authUser}
                key={message.uid}
                message={message}
                onEditMessage={onEditMessage}
                onRemoveMessage={onRemoveMessage}
            />
        ))}
    </ul>
);

class MessageItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editMode: false,
            editText: this.props.message.text,
        };
    }

    onToggleEditMode = () => {
        this.setState(state => ({
            editMode: !state.editMode,
            editText: this.props.message.text,
        }));
    };

    onChangeEditText = event => {
        this.setState({ editText: event.target.value });
    };

    onSaveEditText = () => {
        this.props.onEditMessage(this.props.message, this.state.editText);

        this.setState({ editMode: false });
    };

    render() {

        const { authUser, message, onRemoveMessage } = this.props;
        const { editMode, editText } = this.state;

        return (
            <li>
                {editMode ? (
                    <input
                        type="text"
                        value={editText}
                        onChange={this.onChangeEditText}
                    />
                ) : (
                    <span>
                        <strong>{message.userId}</strong> {message.text}
                        {message.editedAt && <span>(Edited)</span>}
                    </span>
                )}

                {authUser.uid === message.userId && (
                    <span>
                        {editMode ? (
                            <span>
                                <button onClick={this.onSaveEditText}>Save</button>
                                <button onClick={this.onToggleEditMode}>Reset</button>
                            </span>
                        ) : (
                            <button onClick={this.onToggleEditMode}>Edit</button>
                        )}

                        {!editMode && (
                            <button
                                type="button"
                                onClick={() => onRemoveMessage(message.uid)}
                            >
                                Delete
                            </button>
                        )}
                    </span>
                )}
            </li>
        );
    }
}

const condition = authUser => !!authUser;

const Messages = withFirebase(MessagesBase);

export default compose(
    withAuthorization(condition),
)(HomePage);