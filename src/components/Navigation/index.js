import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import styled from 'styled-components';
import BurgerNav from '../BurgerNav';

const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: #FB6F5C;

    font-family: 'Saira Condensed', sans-serif;

`;

const ListInnerContainer = styled.div`
    width: 100%;
    align-items: center;
    display: flex;

    @media (max-width: 980px) {
        display: none;
        padding-left: 0;
    }
`;

const ListItem = styled.li`
    float: left;
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

const ListItemRight = styled.li`
    float: right;
    font-size: 22px;
    font-weight: bold;
    margin-left: auto;
    
    a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 18px;
        text-decoration: none;
    }
    button {   
        margin-right: 18px;
    }
`;

const Logo = styled.h1`
    color: #44062B;
    font-size: 62px;
    margin: 0;
    font-family: 'Wallpoet', cursive;
`;

const Navigation = () => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth authUser={authUser} /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationAuth = ({ authUser }) => (
    <List>
        <ListInnerContainer>
            <ListItem>
                <Link to={ROUTES.LANDING}><Logo>F</Logo></Link>
            </ListItem>
            <ListItem className="navbarItem">
                <Link to={ROUTES.HOME}>HOME</Link>
            </ListItem>
            <ListItem className="navbarItem">
                <Link to={ROUTES.ACCOUNT}>ACCOUNT</Link>
            </ListItem>
            {!!authUser.roles[ROLES.ADMIN] && (
                <ListItem className="navbarItem">
                    <Link to={ROUTES.ADMIN}>ADMIN</Link>
                </ListItem>
            )}
            <ListItemRight className="navbarItem">
                <SignOutButton />
            </ListItemRight>
        </ListInnerContainer>
        <BurgerNav></BurgerNav>
    </List>
);

const NavigationNonAuth = () => (
    <List>
        <ListInnerContainer>
            <ListItem>
                <Link to={ROUTES.LANDING}><Logo>F</Logo></Link>
            </ListItem>
            <ListItem>
                <Link to={ROUTES.SIGN_IN}>SIGN IN</Link>
            </ListItem>
        </ListInnerContainer>
    </List>
);

export default Navigation;
