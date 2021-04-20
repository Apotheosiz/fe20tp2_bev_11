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
import mostFollowed from '../../img/mostFollowed.png';
import add1 from '../../img/add1.png';
import add2 from '../../img/add2.png';
import styled from 'styled-components';
import { SendPic, DeletePic, EditPic, SavePic, UndoPic } from '../svgImg/WelcomePic';
import logo2 from '../../img/logoU2.png';
import logo1long from '../../img/logoU1long.png';

//added the logo array to access company logo images
const logoArr = [{
  name: '',
  logo: logo1long,
  display: 'inline',
  height: '25px',
}, {
  name: 'IBWomen',
  logo: logo2,
  display: 'inline',
  height: '40px',
}, {
  name: 'No company',
  logo: '',
  display: 'none',
  height: '',
}];

const picArr = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];

const StyledDiv = styled.div`
width: 100%;
max-width: 550px;
margin:0 auto;
&>img{
  width:100%;
}
`

const Wrapper = styled.div`
border-radius:8px;
padding:10px;
border:1px solid var(--gray);
margin-bottom:15px;
text-align: center;
&>img{
  width:100%;
  max-width:356px; 
  margin:0 auto;
  @media screen and (min-width: 1024px){
    width:100%;
  }
}
`

const UserCompLogo = styled.div`
text-align: left;
display:flex;
align-items: center;
img{
  margin-right:5%;
}
`

const StyledLi = styled.li`
text-align: left;
display: flex;
justify-content: space-between;
padding: 7px;
background: var(--bgColor);
border-bottom: 1px solid var(--gray);
textarea{
  border: none;
  border-bottom: 2px solid var(--textColor);
  background:transparent;
  padding:2px;
  font-size:inherit;
  font-family:inherit;
}
.profile-and-text{
    display: flex;
    align-items:flex-start;
    flex: 1;
    textarea{
      align-self:flex-end;
      flex-grow: 1;
    }
}
img{
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
.buttons-wrapper{
  align-self: flex-end;
}
form{
    width:100%;
    display:flex;
    align-items:flex-end;
    justify-content:space-between;
    textarea{
      flex:1;
    }
}
`

const ChatButton = styled.button`
content:" ";
width:${props => props.width ? props.width : "26px"};;
height: 24px;
padding:5px;
border: none;
background: transparent;
display:flex;
align-items:flex-end;
cursor:pointer;
&:hover{
  position:relative;
  top:-1px;
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
    //sending authUser.userComp to access messages from a specific company
    this.props.firebase.messages(authUser.userComp).push({
      text: this.state.text,
      userId: authUser.uid,
      username: authUser.username,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
      profilePic: authUser.profilePic,
    });

    this.setState({ text: '' });
    event.preventDefault();
  };

  onRemoveMessage = (authUser, uid) => {
    this.props.firebase.message(authUser.userComp, uid).remove();
  };

  onEditMessage = (authUser, message, text) => {
    const { uid, ...messageSnapshot } = message;

    this.props.firebase.message(authUser.userComp, message.uid).set({
      ...messageSnapshot,
      text,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  componentDidMount() {
    this.setState({ loading: true });
    //populating the message list with company messages from firebase when mounting,if there are any
    this.props.firebase.messages(this.props.authUser.userComp).on('value', snapshot => {

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
    this.props.firebase.messages(this.props.authUser.userComp).off();
  }

  render() {
    const { text, messages, loading } = this.state;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <StyledDiv className={this.props.messagesDivClasses}>

            {/*hardcoded image with most followed tickers*/}
            <Wrapper>
              <img src={mostFollowed} alt="most followed actions" />
            </Wrapper>

            {/*adds only appear on big screens*/}
            {(window.innerWidth > 1024) ? <img src={add2} alt="add" /> : null}
            <Wrapper>
              {loading && <div>Loading ...</div>}

              {/*dinamically changing company logo to loged in user's company logo*/}
              {authUser.userComp ?
                <UserCompLogo>
                  <img
                    style={{
                      display: logoArr[authUser.userComp].display,
                      height: logoArr[authUser.userComp].height,
                    }}
                    src={logoArr[authUser.userComp].logo}
                    alt="CompanyLogo" />
                </UserCompLogo>
                : null
              }

              {/*populating messages in message list*/}
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

              {/*create message textarea field*/}
              <StyledLi>
                <StyledImg style={{ maxHeight: "50px" }} src={picArr[authUser.profilePic - 1]} alt="profile" />
                <form onSubmit={event => this.onCreateMessage(event, authUser)}>
                  <textarea
                    type="text"
                    value={text}
                    onChange={this.onChangeText}
                  />
                  <ChatButton type="Submit message">
                    <SendPic width="100%" margin="0 auto" />
                  </ChatButton>
                </form>
              </StyledLi>
            </Wrapper>

            {/*adds only appear on big screens*/}
            {(window.innerWidth > 1024) ? <img src={add1} alt="add" /> : null}
          </StyledDiv>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const MessageList = ({ authUser, messages, onEditMessage, onRemoveMessage }) => (
  <>
    {/*mapping through messages to list each one in message item component*/}
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
    //toggle edit mode
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.message.text,
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = (authUser) => {
    this.props.onEditMessage(authUser, this.props.message, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {

    const { authUser, message, onRemoveMessage } = this.props;
    const { editMode, editText } = this.state;

    return (
      <StyledLi>

        <span className="profile-and-text">
          <StyledImg src={picArr[message.profilePic - 1]} alt="profile" />
          {editMode ? (
            <textarea
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
          <span className="buttons-wrapper">
            {editMode ? (
              <span>
                <ChatButton title="Save message" onClick={() => this.onSaveEditText(authUser)}>
                  <SavePic width="100%" margin="0 auto" />
                </ChatButton>
                <ChatButton title="Restore message" onClick={this.onToggleEditMode}>
                  <UndoPic width="100%" margin="0 auto" />
                </ChatButton>
              </span>
            ) : (
              <ChatButton onClick={this.onToggleEditMode}>
                <EditPic width="100%" margin="0 auto" />
              </ChatButton>
            )}

            {!editMode && (
              <ChatButton onClick={() => onRemoveMessage(authUser, message.uid)}>
                <DeletePic width="70%" margin="0 auto" />
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