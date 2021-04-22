import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { FormControl } from '../SignIn';
import { FormWrap } from '../SignUp/FormWrap';
import { StyledButton } from '../Button';
import styled from 'styled-components';

const ChangePassButton = styled(StyledButton)`
margin-top:10px;

`

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {

  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;
    //access firebase updatePassword method
    this.props.firebase
      .doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState({ ...INITIAL_STATE, message: "Your password was successfully changed!" });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {

    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <FormWrap>
          <FormControl
            style={{
              //css variables work even for inline styles :)
              borderBottom: '1px solid var(--textGray)',
            }}
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"
          />
          <FormControl
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"
          />
        </FormWrap>

        {/*using the isInvalid variable as boolean for the disabled attribute*/}
        {!isInvalid && <ChangePassButton name="Reset My Password" type="submit">
          Reset My Password
                </ChangePassButton>}
        {this.state.message && <p style={{ color: "red" }}>{this.state.message}</p>}
        {error && <p style={{ color: "red" }}>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);