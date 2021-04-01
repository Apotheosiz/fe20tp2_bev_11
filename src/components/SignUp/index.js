import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import PageContainer from '../PageContainer';
import Button from '../Button';
import styled from 'styled-components';
import { StyledLink, Title, StyledLogo, FormWrap, FormControl, SignInLink} from '../SignIn';

export const StyledP = styled.p`
    padding: 20px 0;
    font-size: 16px;    
    font-family:'Saira Condensed',sans-serif;

    a {
        text-decoration: none;
        text-transform: uppercase;
        font-weight: 600;
        margin-left: 10px;
         &:hover {
            text-decoration: underline;

         }
    }
`;

const StyledFormWrap = styled(FormWrap)`
margin-bottom: 30px;
`

const BeAdmin = styled.div`
width:fit-content;
margin: 0 auto;
`

const SignUpPage = () => (
    <PageContainer>
       <StyledLink to={ROUTES.LANDING} title="Back to Landing Page"><StyledLogo /></StyledLink>
        <Title>Welcome Aboard!</Title>
        <SignUpForm />
        <SignInLink />
    </PageContainer>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
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
        const { username, email, passwordOne, isAdmin } = this.state;

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
            } = this.state;

        const isInvalid = 
            passwordOne !== passwordTwo || 
            passwordOne === '' ||
            email === '' ||
            username === '';

        return(
            <form onSubmit={this.onSubmit}>
                <StyledFormWrap>
                    <FormControl 
                        style={{
                            borderBottom: '1px solid #757575',
                        }}
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
                </StyledFormWrap>
                <StyledFormWrap>
                    <FormControl StyledFormWrap
                        style={{
                            borderBottom: '1px solid #757575',
                        }}
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
                   
                </StyledFormWrap>
                <BeAdmin>
                    <label>
                        Admin:
                        <input
                            name="isAdmin"
                            type="checkbox"
                            checked={isAdmin}
                            onChange={this.onChangeCheckbox}
                        />
                    </label>
                </BeAdmin>

                <Button disabled={isInvalid} type="submit">register</Button>

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