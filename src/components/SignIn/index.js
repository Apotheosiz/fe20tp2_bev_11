import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import PageContainer from '../PageContainer';
import Button from '../Button';
import styled from 'styled-components';

const Title = styled.h1`
    color: white;
`;

const FormWrap = styled.div`
    background-color: #F8C3C3;
    margin: auto;
    padding: 20px;
    max-width: 600px;
    border-radius: 16px;
    margin-bottom: 15px;
`;

const FormControl = styled.input`
    display: block;
    width: 90%;
    height: 47px;
    padding: 0 24px;
    font-size: 13px;
    border: none;
    background-color: transparent;
    margin: auto;
    margin-bottom: 25px;
    border-radius: 16px;
`;

const SignInPage = () => (
    <PageContainer>
        <Title>SIGN IN</Title>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </PageContainer>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
};

class SignInFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }
    onSubmit = event => {
        const { email, password } = this.state;
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
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
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <form onSubmit={this.onSubmit}>
                <FormWrap>
                    <FormControl
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        type="text"
                        placeholder="email">
                    </FormControl>
                    <FormControl
                        name="password"
                        value={password}
                        onChange={this.onChange}
                        type="password"
                        placeholder="password"
                    >
                    </FormControl>
                </FormWrap>
                <Button disabled={isInvalid} type="submit">
                 sign in
                </Button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}
const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);
export default SignInPage;
export { SignInForm };