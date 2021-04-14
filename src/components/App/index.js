import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import { createGlobalStyle } from 'styled-components';

// export const fluidFontSize = 'font-size: calc(16px + 6 * ((100vw - 320px) / 680))';
// export const fluidFontTitle = 'font-size: calc(20px + 15 * ((100vw - 320px) / 880))';

const GlobalStyle = createGlobalStyle`


h1{
   font-size: 20px; 
}
/* @media screen and (min-width: 320px) {

    font-size: ;
    h1{
        font-size: ;
     }

}
@media screen and (min-width: 1200px) {

    font-size: 22px;
    h1{
        font-size: 32px;
     }

}*/

*,
*:before,
*:after {
    margin: 0;
    padding: 0;
    color: #44062B;
    box-sizing: border-box;
  }

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active  {
    transition: background-color 5000s;
}

#outerWrap{
    padding-top: 70px;
    
    @media (min-width: 830px) {
        padding-top: 0;
    }
    #pageWrap{
        max-width:1024px;
        margin: 0 auto;
    }
}
`;

const App = () => (
    <Router>
        <div id="outerWrap">
        <Navigation />
            <div id="pageWrap">
                <Route exact path={ROUTES.LANDING} component={LandingPage} />
                <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

                <Route path={ROUTES.HOME} component={HomePage} />
                <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                <Route path={ROUTES.ADMIN} component={AdminPage} />
            </div>
        </div>
        <GlobalStyle />
    </Router>
);

export default withAuthentication(App);
