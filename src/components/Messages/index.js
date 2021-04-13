import { withFirebase } from '../Firebase';
import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import pic1 from '../../img/profiles/1.png';
import pic2 from '../../img/profiles/2.png';
import pic3 from '../../img/profiles/3.png';
import pic4 from '../../img/profiles/4.png';
import pic5 from '../../img/profiles/5.png';
import pic6 from '../../img/profiles/6.png';
import pic7 from '../../img/profiles/7.png';
import pic8 from '../../img/profiles/8.png';

const picArr = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];

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
          username: authUser.username,
          createdAt: this.props.firebase.serverValue.TIMESTAMP,
          profilePic: authUser.profilePic,
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
              <img src={picArr[message.profilePic - 1]} alt="profile"/>
              {editMode ? (
                  <input
                      type="text"
                      value={editText}
                      onChange={this.onChangeEditText}
                  />
              ) : (
                  <span>
                      <strong>{message.username}</strong> {message.text}
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
const Messages = withFirebase(MessagesBase);

export default Messages;