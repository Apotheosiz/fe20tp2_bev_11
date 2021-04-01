import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink, StyledP } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import Logo from '../Landing/Logo.js';
import PageContainer from '../PageContainer';
import Button from '../Button';
import styled from 'styled-components';
import { WelcomePic } from '../svgImg/WelcomePic.js';
import { Link } from 'react-router-dom';


export const StyledLogo = styled(Logo)`
    h2 {
        color: inherit;
        font-family:'Saira Condensed',sans-serif;
        font-weight:400;
    }
    `;
export const StyledLink = styled(Link)`
text-decoration: none;
`

export const Title = styled.h1`
    margin-top: 25px;
    font-size: 25px;
`;

export const FormWrap = styled.div`
    background-color: #F8C3C3;
    margin: auto;
    padding: 20px 0;
    max-width: 600px;
    width: 80%;
    border-radius: 16px;    
`;

export const FormControl = styled.input`
    display: block;
    width: 90%;
    height: 47px;
    font-size: 13px;
    border: none;
    background-color: transparent;
    margin: auto;
    padding: 15px;
`;

const SignInPage = () => (
    <PageContainer>
        <StyledLink to={ROUTES.LANDING} title="Back to Landing Page"><StyledLogo /></StyledLink>
        <Title>Welcome Back!</Title>
        <WelcomePic />
        <SignInForm />
        
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
                        style={{
                            borderBottom: '1px solid #757575',
                        }}
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
                <PasswordForgetLink />
                <Button disabled={isInvalid} type="submit">
                 sign in
                </Button>
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export const SignInLink = () => (
    <StyledP>
        Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </StyledP>
);

const SignInForm = compose(
    withRouter,
    withFirebase,
)(SignInFormBase);
export default SignInPage;
export { SignInForm };