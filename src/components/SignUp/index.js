import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import PageContainer from '../PageContainer';
import Button from '../Button';
import styled from 'styled-components';
import { StyledLink, Title, FormControl, SignInLink} from '../SignIn';
import { FormWrap } from './FormWrap';
import Logo from '../Landing/Logo.js';
import pic1 from '../../img/profiles/1.png';
import pic2 from '../../img/profiles/2.png';
import pic3 from '../../img/profiles/3.png';
import pic4 from '../../img/profiles/4.png';
import pic5 from '../../img/profiles/5.png';
import pic6 from '../../img/profiles/6.png';
import pic7 from '../../img/profiles/7.png';
import pic8 from '../../img/profiles/8.png';
import logo1 from '../../img/logoU1.png';
import logo2 from '../../img/logoU2.png';
import logo1long from '../../img/logoU1long.png';

const picArr = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];
const logoArr = [{
        name: 'Ericasdaughter',
        logo:logo1,

    }, {
        name: 'IBW',
        logo:logo2,
    }, {
        name: 'No company',
        logo:'',
    }];

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

const UserCompWrapper = styled.div`
text-align:left;
margin:0 25px;
padding: 15px;
cursor:pointer;
`

const StyledLogo = styled.img`
max-width: 50px;
max-height: 20px;
`

const StyledFormWrap = styled(FormWrap)`
margin-bottom: 30px;
`
const ProfileStyledFormWrap = styled(StyledFormWrap)`
    background: none;
    .active {
        border: 2px solid #44062B;
    }
`
export const StyledImg = styled.img`
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
    cursor: pointer;
    &:hover {
        position: relative;
        top: -2px;
    }
`

const BeAdmin = styled.div`
width:fit-content;
margin: 0 auto;
`

const SignUpPage = () => (
    <PageContainer>
       <StyledLink to={ROUTES.LANDING} title="Back to Landing Page"><Logo /></StyledLink>
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
    profilePic: '1',
    showComp: false,
    userComp:'',
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const { username, email, passwordOne, isAdmin, profilePic } = this.state;

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
                        },
                        profilePic,
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
                    <p onClick={() => {
                        this.setState({ showComp: !this.state.showComp }); 
                    }}
                    >
                    Choose company <span>▼</span>
                    </p>
                {this.state.showComp ? 
                    <>{logoArr.map((userComp, index) => (
                        <UserCompWrapper 
                            key={index}
                            data-value={index} 
                            className="company"
                            onClick={(event) => { 
                                    this.setState({ 
                                        userComp: event.target.closest('.company').dataset.value
                                    });
                                }} 
                            >
                            <StyledLogo src={userComp.logo} alt="Comp"/>
                            <span> {userComp.name}</span>
                            {this.state.userComp == index ?
                            <span> ✔</span>
                            :null}
                        </UserCompWrapper>
                    ))}</>
                    :
                    null}
                </StyledFormWrap>
                <StyledFormWrap bottomMargin>
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
                <ProfileStyledFormWrap >
                    {picArr.map((pic, index) => (
                        <StyledImg
                            key={index}
                            src={pic} 
                            data-value={index + 1} 
                            alt="profile pic" 
                            onClick={(event) => { 
                                this.setState({ profilePic: event.target.dataset.value });
                                // event.target.parentNode.childNodes.classList.remove('active');
                                // event.target.classList.add('active');
                            } }  
                            className={this.state.profilePic == (index + 1) ? "active":""} 
                        />
                    ))}
                   
                    </ProfileStyledFormWrap>
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