import React, { useState, useEffect, useContext } from 'react';
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
import Footer from '../Footer';
import styled from 'styled-components';
import { AuthUserContext } from '../Session';
import logo2 from '../../img/logoU2.png';
import logo1long from '../../img/logoU1long.png';

const logoArr = [{
    name: '',
    logo:logo1long,
    display: 'inline', 
    height: '25px',
    maxWidth: '275px',      
  }, {
    name: 'IBWomen',
    logo:logo2,
    display: 'inline',
    height: '40px',
    maxWidth:'fit-content', 
  }, {
    name: 'No company',
    logo:'',
    display: 'none',
    height: '',
    maxWidth:'fit-content',
  }];

// export const fluidFontSize = 'font-size: calc(16px + 6 * ((100vw - 320px) / 680))';
// export const fluidFontTitle = 'font-size: calc(20px + 15 * ((100vw - 320px) / 880))';

//Change both gray texts to one variable: #5f6368, #5c6065

const customStyles =[{
    name:"0",
    details: "ErciasDaughter",
    mainColor: "#FAD22D",
    secColor: "#FB6F5C",
    textColor: "#020F45",
    bgColor: "#fffff",
    gray:"#efefef",
    textGray:"#5c6065",
    textLight: "white",
},{
  name:"1",
  details: "IBW",
  mainColor: "#27c0d8",
  secColor: "#27c0d8",
  textColor: "#3C120B",
  bgColor: "#fffff",
  gray:"#efefef",
  textGray:"#5c6065",
  textLight: "white",
},{
  name:"2",
  details: "Default",
  mainColor: "#F8C3C3",
  secColor: "#FB6F5C",
  textColor: "#44062B",
  bgColor: "#fffff",
  gray:"#efefef",
  textGray:"#5c6065",
  textLight: "white",
}];

const GlobalStyle = createGlobalStyle`

:root {
    --mainColor: ${props => (props.customStyle.mainColor ? props.customStyle.mainColor : 'black')};
    --secColor: ${props => (props.customStyle.secColor ? props.customStyle.secColor : 'black')};
    --textColor: #44062B;
    --gray: #efefef;
    --bgColor: #fffff;
    --textGray: #5c6065;
    --textLight: white;
  }

h1{
   font-size: 20px; 
}

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
    
    @media (min-width: 679px) {
        padding-top: 0;
    }
    #pageWrap{
        max-width:1024px;
        margin: 0 auto;
    }
}
`;

const UserCompLogo = styled.div`
padding:38.5px 15px;
display: flex;
align-items: center;
`

const ContentWrap = styled.div`
min-height: calc(100vh - 74px);
`

const App = () => {

    const [customStyle, setCustomStyle ] = useState(customStyles[2]);

    const authUser = useContext(AuthUserContext);

    useEffect(() => {
        if (authUser) { 
            customStyles.map((styleObj) => {
                if (authUser.userComp === styleObj.name) {
                    setCustomStyle(styleObj);
                }
            })
        }
    },[authUser])

    return (
    <Router>

        {authUser && authUser.userComp && (window.innerWidth < 680) ?
            <UserCompLogo>
                <img 
                style={{ 
                    display: logoArr[authUser.userComp].display,
                    height: logoArr[authUser.userComp].height,
                    maxWidth: logoArr[authUser.userComp].maxWidth,
                }} 
                src={logoArr[authUser.userComp].logo} 
                alt="CompanyLogo"/>
            </UserCompLogo>
            : null
        }
            
        <div id="outerWrap">
            <ContentWrap>
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
            </ContentWrap>
            <Footer />
        </div>
        {customStyle ? <GlobalStyle customStyle={customStyle} />: null}
    </Router>
)};

export default withAuthentication(App);
