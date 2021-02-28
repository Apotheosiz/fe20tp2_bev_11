import React, { Component } from 'react';
import { compose } from 'recompose';
import {
    AuthUserContext,
    withAuthorization,
    withEmailVerification,
} from '../Session';
import { withFirebase } from '../Firebase';

const HomePage = () => (
    <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>

        <Messages />

    </div>
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
        });

        this.setState({ text: '' });

        event.preventDefault();
    };

    onRemoveMessage = uid => {
        this.props.firebase.message(uid).remove();
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
                                messages={messages}
                                onRemoveMessage={this.onRemoveMessage}
                            />
                        ) : (
                                <div>There are no messages ...</div>
                            )}

                        <form onSubmit={this.onCreateMessage}>
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

const MessageList = ({ messages, onRemoveMessage }) => (
    <ul>
        {messages.map(message => (
            <MessageItem key={message.uid}
                message={message}
                onRemoveMessage={onRemoveMessage}
            />
        ))}
    </ul>
);

const MessageItem = ({ message, onRemoveMessage }) => (
    <li>
        <strong>{message.userId}</strong>

        {message.text}

        <button
            type="button"
            onClick={() => onRemoveMessage(message.uid)}
        >
            Delete
        </button>
    </li>
);

const condition = authUser => !!authUser;

const Messages = withFirebase(MessagesBase);
export default compose(
    withEmailVerification,
    withAuthorization(condition),
)(HomePage);