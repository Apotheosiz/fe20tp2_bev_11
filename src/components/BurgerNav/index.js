import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { slide as Menu } from 'react-burger-menu';
import styled from 'styled-components';
import { StyledImg } from '../SignUp';

import pic1 from '../../img/profiles/1.png';
import pic2 from '../../img/profiles/2.png';
import pic3 from '../../img/profiles/3.png';
import pic4 from '../../img/profiles/4.png';
import pic5 from '../../img/profiles/5.png';
import pic6 from '../../img/profiles/6.png';
import pic7 from '../../img/profiles/7.png';
import pic8 from '../../img/profiles/8.png';

const picArr = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];

const BM = styled.div`
    @media (min-width: 681px) {
        display: none;
    }
    position: fixed;
    top: 0;
    right: 0;
    z-index: 3;
`;

const BurgerList = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 5px;
    padding-left: 50px;
    overflow: hidden;
    align-items: center;
    display: flex;
    font-family: 'Saira Condensed', sans-serif;
    
`;

const BurgerItem = styled.li`
    font-size: 22px;
    font-weight: bold;    
    a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 18px;
        text-decoration: none;
    }
    img{
      margin:20px 0 0 0;
      &:hover{
          top:0;
          border: 2px solid var(--textColor);
      }
  }
`;

const Logo = styled.h1`
    color: var(--textColor);
    font-size: 62px;
    margin: 0;
    font-family: 'Wallpoet', cursive;
`;

const BurgerBar = styled.span`
    position: absolute; 
    height: 20%; 
    left: 0px; 
    right: 0px; 
    top: 0%; 
    opacity: 1; 
    background: var(--textColor); 
    border-radius: 5px;

    &:nth-child(2) {
      top: 40%;
    }

    &:nth-child(3) {
      top: 80%;
    }
`;

const StyledBurgerButton = styled.div`
      position: fixed;
      width: 36px;
      height: 30px;
      right: 20px;
      top: 36px;
`;

var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      right: '20px',
      top: '36px'
    },
    bmBurgerBars: {
      background: 'var(--textColor)',
      borderRadius: '5px'
    },
    bmCrossButton: {
      height: '34px',
      width: '34px'
    },
    bmCross: {
      background: 'var(--textColor)'
    },
    bmMenuWrap: {
      position: 'fixed',
    },
    bmMenu: {
      background: 'var(--secColor)',
      padding: '50px 30px 0',
      fontSize: '22px'
    },
    bmMorphShape: {
      fill: 'var(--textColor)'
    },
    bmItemList: {
      color: 'var(--textLight)',
      padding: '10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)',      
      top: '0',
      right: '0',
    }
  }  

class BurgerNav extends React.Component {
  showSettings (event) {
    event.preventDefault();
  }

  render () {
    return (
      <MyProvider>
          <BM> 
            <BurgerButton />
            <AuthUserContext.Consumer>
                {authUser => authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />}
            </AuthUserContext.Consumer>
          </BM>
        </MyProvider>
    );
  }
}

// make a new context
const MyContext = React.createContext();

// create the provider
const MyProvider = (props) => {
  const [menuOpenState, setMenuOpenState] = useState(false)
  
  return (
    <MyContext.Provider value={{
      isMenuOpen: menuOpenState,
      toggleMenu: () => setMenuOpenState(!menuOpenState),
      stateChangeHandler: (newState) => setMenuOpenState(newState.isOpen)
    }}>
      {props.children}
    </MyContext.Provider>
  )
}

// create a button that calls a context function to set a new open state when clicked
const BurgerButton = () => {
  const ctx = useContext(MyContext)
  return (
    <StyledBurgerButton>
      <button id="react-burger-menu-btn" onClick={ctx.toggleMenu}></button>
      <span>
        <BurgerBar class="bm-burger-bars"></BurgerBar>
        <BurgerBar class="bm-burger-bars"></BurgerBar>
        <BurgerBar class="bm-burger-bars"></BurgerBar>
      </span>
    </StyledBurgerButton>
  )
}

const NavigationAuth = ({ authUser }) => {
  const ctx = useContext(MyContext)

  return (
    <Menu 
    right 
    styles={styles} 
    pageWrapId={ "pageWrap"} 
    outerContainerId={ "outerWrap" } 
    disableAutoFocus 
    isOpen={ false } 
    customBurgerIcon={false}
    isOpen={ctx.isMenuOpen}
    onStateChange={(state) => ctx.stateChangeHandler(state)}>
            <BurgerItem className="navbarItem" onClick={ctx.toggleMenu}>
                <Link to={ROUTES.HOME}>HOME</Link>
            </BurgerItem>
            {!!authUser.roles[ROLES.ADMIN] && (
                <BurgerItem className="navbarItem" onClick={ctx.toggleMenu}>
                    <Link to={ROUTES.ADMIN}>ADMIN</Link>
                </BurgerItem>
            )}
            <BurgerItem className="navbarItem">
                <Link to={ROUTES.ACCOUNT} onClick={ctx.toggleMenu}>
                  <StyledImg style={{marginRight: '0'}} src={picArr[authUser.profilePic - 1]} alt="profile"/>
                </Link>
            </BurgerItem>
            <BurgerItem className="navbarItem" onClick={ctx.toggleMenu}>                
                <SignOutButton />
            </BurgerItem>
    </Menu>
  )
}

const NavigationNonAuth = () => (
    <BurgerList>
        <BurgerItem>
            <Link to={ROUTES.LANDING}><Logo>F</Logo></Link>
        </BurgerItem>
        <BurgerItem>
            <Link to={ROUTES.SIGN_IN}>SIGN IN</Link>
        </BurgerItem>
    </BurgerList>
);


export default BurgerNav;