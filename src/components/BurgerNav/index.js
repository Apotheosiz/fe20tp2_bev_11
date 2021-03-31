import React from 'react';
import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import { slide as Menu } from 'react-burger-menu'
import styled from 'styled-components';

const BM = styled.div`
    @media (min-width: 981px) {
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
`;

const Logo = styled.h1`
    color: #44062B;
    font-size: 62px;
    margin: 0;
    font-family: 'Wallpoet', cursive;
`;

var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '36px',
      height: '30px',
      right: '36px',
      top: '36px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmBurgerBarsHover: {
      background: '#a90000'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px'
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenuWrap: {
      position: 'fixed',
      height: '100%'
    },
    bmMenu: {
      background: '#FB6F5C',
      padding: '2.5em 1.5em 0',
      fontSize: '1.15em'
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em',
      display: 'flex',
      flexDirection: 'column'
    },
    bmItem: {
      display: 'inline-block'
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
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
    return (
        <BM>        
            <AuthUserContext.Consumer>
                {authUser =>
                    authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
                }
            </AuthUserContext.Consumer>
        </BM>
    );
  }
}

const NavigationAuth = ({ authUser }) => (
    <Menu right styles={styles} pageWrapId={ "pageWrap"} outerContainerId={ "outerWrap" } disableAutoFocus >
            <BurgerItem className="navbarItem">
                <Link to={ROUTES.HOME}>HOME</Link>
            </BurgerItem>
            <BurgerItem className="navbarItem">
                <Link to={ROUTES.ACCOUNT}>ACCOUNT</Link>
            </BurgerItem>
            {!!authUser.roles[ROLES.ADMIN] && (
                <BurgerItem className="navbarItem">
                    <Link to={ROUTES.ADMIN}>ADMIN</Link>
                </BurgerItem>
            )}
            <BurgerItem className="navbarItem">
                <SignOutButton />
            </BurgerItem>
    </Menu>
);

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