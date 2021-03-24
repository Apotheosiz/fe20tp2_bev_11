import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

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

const StyledP = styled.p`
    a {
        color: black;
    }
`;

const SignUpPage = () => (
    <PageContainer>
        <Title>Sign up</Title>
        <SignUpForm />
    </PageContainer>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    ticker:'',
    isAdmin: false,
    error: null,
    tickers: '',
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne, isAdmin, ticker } = this.state;

        const roles = {};

        if (isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {
                // Create a user in your Firebase realtime database
                return this.props.firebase
                    .user(authUser.user.uid)
                    .set({
                        username,
                        email,
                        roles,
                        ticker,
                        tickers: {
                            AAPL: {
                                currency: 'USD',
                                exchangeShortName: 'NASDAQ',
                                name: 'Apple Inc.',
                                stockExchange: 'NasdaqGS',
                                symbol:'AAPL',
                            }
                        }
                    });
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

        event.preventDefault();
    }

    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    onChangeCheckbox = event => {
        this.setState({ [event.target.name]: event.target.checked });
    };

    render() {

        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            isAdmin,
            error,
            ticker,
            } = this.state;

        const isInvalid = 
            passwordOne !== passwordTwo || 
            passwordOne === '' ||
            email === '' ||
            username === '';

        return(
            <form onSubmit={this.onSubmit}>
                <FormWrap>
                <FormControl 
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="full name"
                />
                <FormControl 
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="email"
                />
                </FormWrap>
                <FormWrap>
                <FormControl 
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="password"
                />
                <FormControl 
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="confirm password"
                />
                <label>
                    Admin:
                    <input
                        name="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        onChange={this.onChangeCheckbox}
                    />
                </label>
                </FormWrap>
                <FormWrap>
                    <FormControl
                        name="ticker"
                        value={ticker}
                        onChange={this.onChange}
                        type="text"
                        placeholder="Company ticker"
                    />
                </FormWrap>
                <Button disabled={isInvalid} type="submit">sign up</Button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <StyledP>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </StyledP>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;
export { SignUpForm, SignUpLink };