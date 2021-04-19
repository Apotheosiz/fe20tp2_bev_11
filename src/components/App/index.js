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

//an array containing data about the logos of the companies the users are from, the ones that 'paid' for app customization
const logoArr = [{
  name: '',
  logo: logo1long,
  display: 'inline',
  height: '25px',
  maxWidth: '275px',
}, {
  name: 'IBWomen',
  logo: logo2,
  display: 'inline',
  height: '40px',
  maxWidth: 'fit-content',
}, {
  name: 'No company',
  logo: '',
  display: 'none',
  height: '',
  maxWidth: 'fit-content',
}];

//array with style objects for fast customization, there is a default style and 2 company styles
//it is used in combination with state and css variabales declared in styled components global styling 
const customStyles = [{
  name: "0",
  details: "ErciasDaughter",
  mainColor: "#fce99c",
  secColor: "#f9c806",
  textColor: "#020F45",
  bgColor: "#fffff",
  gray: "#efefef",
  textGray: "#5c6065",
  textLight: "white",
}, {
  name: "1",
  details: "IBW",
  mainColor: "#71d7ff",
  secColor: "#00a4e6",
  textColor: "#3C120B",
  bgColor: "#fffff",
  gray: "#efefef",
  textGray: "#5c6065",
  textLight: "white",
}, {
  name: "2",
  details: "Default",
  mainColor: "#F8C3C3",
  secColor: "#FB6F5C",
  textColor: "#44062B",
  bgColor: "#fffff",
  gray: "#efefef",
  textGray: "#5c6065",
  textLight: "white",
}];


const GlobalStyle = createGlobalStyle`
//css variables work great with styled components, easy to customize all components
:root {
    --mainColor: ${props => (props.customStyle.mainColor ? props.customStyle.mainColor : '#f8c3c3')};
    --secColor: ${props => (props.customStyle.secColor ? props.customStyle.secColor : '#fb6f5c')};
    --textColor:${props => (props.customStyle.textColor ? props.customStyle.textColor : '#44062B')};
    --gray:${props => (props.customStyle.gray ? props.customStyle.gray : '#efefef')};
    --bgColor:${props => (props.customStyle.bgColor ? props.customStyle.bgColor : '#fffff')};
    --textGray: ${props => (props.customStyle.textGray ? props.customStyle.textGray : '#5c6065')};
    --textLight: ${props => (props.customStyle.textLight ? props.customStyle.textLight : 'white')};
  }

h1{
   font-size: 20px; 
}

*,
*:before,
*:after {
    margin: 0;
    padding: 0;
    color: var(--textColor);
    box-sizing: border-box;
  }

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus, 
input:-webkit-autofill:active  {
    transition: background-color 5000s;
}

#pageWrap{
    max-width:1024px;
    margin: 0 auto;
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
  //state to save style object in when authUser is logged in
  const [customStyle, setCustomStyle] = useState(customStyles[2]);

  const authUser = useContext(AuthUserContext);

  useEffect(() => {
    if (authUser) {
      customStyles.forEach(styleObj => {
        //selects the object that has the same name as the userComp stored in firebase(that the user chooses at login)
        if (authUser.userComp === styleObj.name) {
          setCustomStyle(styleObj);
        }
      })
    }
  }, [authUser])

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
            alt="CompanyLogo" />
        </UserCompLogo>
        : null
      }

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
      {/*sends the customStyle object stored in state to styled components global*/}
      {customStyle ? <GlobalStyle customStyle={customStyle} /> : null}
    </Router>
  )
};

export default withAuthentication(App);
