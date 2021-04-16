import React from 'react';
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
            {!!authUser.roles[ROLES.ADMIN] && (
                <BurgerItem className="navbarItem">
                    <Link to={ROUTES.ADMIN}>ADMIN</Link>
                </BurgerItem>
            )}
            <BurgerItem className="navbarItem">
                <Link to={ROUTES.ACCOUNT}>
                  <StyledImg style={{marginRight: '0'}} src={picArr[authUser.profilePic - 1]} alt="profile"/>
                </Link>
            </BurgerItem>
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