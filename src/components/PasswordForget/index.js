import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import PageContainer from '../PageContainer';
import styled from 'styled-components';

import { Title, FormControl } from '../SignIn';
import { FormWrap } from '../SignUp/FormWrap';
import Button from '../Button';
import { PasForgPic } from '../svgImg/WelcomePic.js';

const StyledP = styled.p`

padding: 20px 0;
a {    
  font-size: 16px;
  text-decoration: none;
  font-family:'Saira Condensed',sans-serif;
  &:hover {
      text-decoration: underline;
  }
}
`;

const StyledForm = styled.form`
 div {
    margin-bottom: 30px;
 }
`

const PasswordForgetPage = () => (
  <PageContainer>
    <Title>Forgot your password?</Title>

    {/* added svg picture as react component */}
    <PasForgPic />
    <PasswordForgetForm />
  </PageContainer>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};


class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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

    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <StyledForm onSubmit={this.onSubmit}>
        <FormWrap>
          <FormControl
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
            required
          />
        </FormWrap>
        {error && <p style={{ color: "red" }}>{error.message}</p>}
        <Button disabled={isInvalid} name="reset my password" width="fit-content" type="submit">
          Reset My Password
                </Button>
      </StyledForm>

    );
  }
}

const PasswordForgetLink = () => (
  <StyledP>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </StyledP>
);


export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
export { PasswordForgetForm, PasswordForgetLink };