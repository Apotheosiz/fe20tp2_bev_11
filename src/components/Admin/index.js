import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import {
  withAuthorization,
} from '../Session';
import * as ROLES from '../../constants/roles';
import * as ROUTES from '../../constants/routes';
import PageContainer from '../PageContainer';
import pic1 from '../../img/profiles/1.png';
import pic2 from '../../img/profiles/2.png';
import pic3 from '../../img/profiles/3.png';
import pic4 from '../../img/profiles/4.png';
import pic5 from '../../img/profiles/5.png';
import pic6 from '../../img/profiles/6.png';
import pic7 from '../../img/profiles/7.png';
import pic8 from '../../img/profiles/8.png';

const picArr = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];

const AdminPage = () => (
  <PageContainer>
    <h1>Admin*</h1>
    <small>*under construction</small>
    <Switch>
      <Route exact path={ROUTES.ADMIN_DETAILS} component={UserItem} />
      <Route exact path={ROUTES.ADMIN} component={UserList} />
    </Switch>
  </PageContainer>
);

class UserListBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    //accesing firebase database to get users
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();

      //creating an array with all users
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));

      //saving users array in state
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.users().off();
  }

  render() {
    const { users, loading } = this.state;
    return (
      <>
        <h2>Users</h2>
        {loading && <div>Loading ...</div>}
        <ul>
          {users.map(user => (
            <li key={user.uid}>
              <img style={{ width: '30px' }} src={picArr[user.profilePic - 1]} alt="profile" />
              <strong>ID:</strong> {user.uid}
              <strong>E-Mail:</strong> {user.email}
              <strong>Username:</strong> {user.username}
              <Link
                to={{
                  pathname: `${ROUTES.ADMIN}/${user.uid}`,
                  state: { user },
                }}
              >
                Details
                            </Link>
            </li>
          ))}
        </ul>
      </>
    );
  }
}

class UserItemBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      user: null,
      ...props.location.state,
    };
  }
  componentDidMount() {
    if (this.state.user) {
      return;
    }

    this.setState({ loading: true });
    this.props.firebase
      .user(this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          user: snapshot.val(),
          loading: false,
        });
      });
  }
  componentWillUnmount() {
    this.props.firebase.user(this.props.match.params.id).off();
  }

  onSendPasswordResetEmail = () => {
    this.props.firebase.doPasswordReset(this.state.user.email);
  };

  render() {
    const { user, loading } = this.state;
    return (
      <>
        <h2>User ({this.props.match.params.id})</h2>
        {loading && <div>Loading ...</div>}
        {user && (
          <>
            <strong>ID:</strong> {user.uid}
            <strong>E-Mail:</strong> {user.email}
            <strong>Username:</strong> {user.username}
            <button
              name="send password reset"
              type="button"
              onClick={this.onSendPasswordResetEmail}
            >
              Send Password Reset
                            </button>
          </>
        )}
      </>
    );
  }
}

const condition = authUser =>
  authUser && !!authUser.roles[ROLES.ADMIN];

const UserList = withFirebase(UserListBase);
const UserItem = withFirebase(UserItemBase);

export default compose(
  withAuthorization(condition),
  withFirebase,
)(AdminPage);