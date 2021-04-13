import { withFirebase } from '../Firebase';
import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { StyledImg } from '../SignUp';
import pic1 from '../../img/profiles/1.png';
import pic2 from '../../img/profiles/2.png';
import pic3 from '../../img/profiles/3.png';
import pic4 from '../../img/profiles/4.png';
import pic5 from '../../img/profiles/5.png';
import pic6 from '../../img/profiles/6.png';
import pic7 from '../../img/profiles/7.png';
import pic8 from '../../img/profiles/8.png';
import styled from 'styled-components';
import { DeletePic } from '../svgImg/WelcomePic';
import { EditPic } from '../svgImg/WelcomePic';

const picArr = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];

const StyledDiv = styled.div`
padding:10px;
border-radius:8px;
background: #efefef;
width: 100%;
max-width: 550px;
margin:0 auto;
`

const StyledLi = styled.li`
    display: flex;
    justify-content: space-between;
    padding: 20px;
    background: #F8C3C3;
    border-radius: 20px;
    border-bottom: 1px solid #efefef;
    .profile-and-text{
        display: flex;
        align-items:flex-start;
    }
    img{
        //margin-bottom:10px;
        &:hover{
            top:0;
            cursor: initial;
        }
    }
    form,
    span{
        display:flex;
        align-items: center;
    }
    form{
        width:100%;
    }
`

const ChatButton = styled.button`
content:" ";
    svg {
        fill: #efefef;
        &:hover {
            fill: #44062B;
        }
    }

`

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
                    <StyledDiv>
                      {loading && <div>Loading ...</div>}

                      {messages ? (
                          <MessageList
                              authUser={authUser}
                              messages={messages}
                              onEditMessage={this.onEditMessage}
                              onRemoveMessage={this.onRemoveMessage}
                          />
                      ) : (
                          null
                      )}
                        <StyledLi>
                        <StyledImg src={picArr[authUser.profilePic- 1]} alt="profile"/>
                        <form onSubmit={event => this.onCreateMessage(event, authUser)}>
                            <input
                                type="text"
                                value={text}
                                onChange={this.onChangeText}
                            />
                            <ChatButton type="submit">Send</ChatButton>
                        </form>
                        </StyledLi>
                    </StyledDiv>
                )}
          </AuthUserContext.Consumer>
      );

  }
}

const MessageList = ({ authUser, messages, onEditMessage, onRemoveMessage }) => (
  <>
      {messages.map(message => (
          <MessageItem
              authUser={authUser}
              key={message.uid}
              message={message}
              onEditMessage={onEditMessage}
              onRemoveMessage={onRemoveMessage}
          />
      ))}
  </>
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
          <StyledLi>
                <span className="profile-and-text">
                    <StyledImg src={picArr[message.profilePic - 1]} alt="profile"/>
                    {editMode ? (
                        <input
                            type="text"
                            value={editText}
                            onChange={this.onChangeEditText}
                        />
                    ) : (
                        <div>
                            <strong>{message.username}</strong> 
                            <p>{message.text}</p>
                        </div>
                    )}
                </span>
              {authUser.uid === message.userId && (
                  <span>
                      {editMode ? (
                            <span>
                              <ChatButton onClick={this.onSaveEditText}>Save</ChatButton>
                              <ChatButton onClick={this.onToggleEditMode}>Reset</ChatButton>
                            </span>
                      ) : (
                            <ChatButton onClick={this.onToggleEditMode}>
                              Edit{/*<EditPic />*/}
                            </ChatButton>
                      )}

                      {!editMode && (    
                            <ChatButton onClick={() => onRemoveMessage(message.uid)}>                    
                              Delete{/*<DeletePic />*/}
                            </ChatButton>
                      )}
                  </span>
              )}
          </StyledLi>
      );
  }
}
const Messages = withFirebase(MessagesBase);

export default Messages;