import { Link } from 'react-router-dom';
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Session';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import styled from 'styled-components';
import BurgerNav from '../BurgerNav';
import { StyledImg } from '../SignUp';
import pic1 from '../../img/profiles/1.png';
import pic2 from '../../img/profiles/2.png';
import pic3 from '../../img/profiles/3.png';
import pic4 from '../../img/profiles/4.png';
import pic5 from '../../img/profiles/5.png';
import pic6 from '../../img/profiles/6.png';
import pic7 from '../../img/profiles/7.png';
import pic8 from '../../img/profiles/8.png';
import logo2 from '../../img/logoU2.png';
import logo1long from '../../img/logoU1long.png';

const picArr = [pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8];

const logoArr = [{
  name: '',
  logo: logo1long,
  display: 'inline',
  height: '20px',
}, {
  name: 'IBWomen',
  logo: logo2,
  display: 'inline',
  height: '25px',
}, {
  name: 'No company',
  logo: '',
  display: 'none',
  height: '',
}];

const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    overflow: hidden;
    background-color: var(--secColor);
    font-family: 'Saira Condensed', sans-serif;

`;

const ListInnerContainer = styled.div`
width: 100%;
align-items: center;
display: flex;

background: none;
border: none;
svg{
  width:30px;
}

@media (max-width: 680px) {
  display: none;
  padding-left: 0;
}
&:after { 
  content: "."; 
  visibility: hidden; 
  display: block; 
  height: 0; 
  clear: both;
}
`;

const ListItem = styled.li`
font-size: 22px;
font-weight: bold;

a {
  display: block;
  color: white;
  text-align: center;
  padding: 14px 18px;
  text-decoration: none;
  cursor: pointer;
}
`;

const ListItemRight = styled.li`
    float: right;
    font-size: 22px;
    font-weight: bold;
    margin-left: auto;
    display:flex;
    align-items:center;
    
    a {
        display:flex;
        align-items:center;
        justify-content:center;
        color: white;
        text-align: center;
        padding: 14px 18px;
        text-decoration: none;
        img{
            margin-right:0;
            &:hover{
                top:0;
                border: 2px solid var(--textColor);
            }
        }
    }
    button {   
        margin-right: 18px;
    }
`;

const Logo = styled.h1`
    color: var(--textColor);
    font-size: 62px;
    margin: 0;
    font-family: 'Wallpoet', cursive;
`;

const UserLogo = styled.div`
padding:14px 18px;
display:flex;
align-items:center;
`

const Navigation = ({ setCustomStyle }) => (
  <div>
    {/*navigation content is different for authenticated users*/}
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth setCustomStyle={setCustomStyle} authUser={authUser} /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
);

const NavigationAuth = ({ setCustomStyle, authUser }) => (
  <List>
    <ListInnerContainer>
      <ListItem>
        {/*when user signs up with no company he gets a userComp == 2 and the Fink logo*/}
        {(authUser.userComp == 2)
          ? <Link to={ROUTES.LANDING}><Logo>F</Logo></Link>
          : authUser.userComp &&
          <UserLogo>
            <img
              style={{
                display: logoArr[authUser.userComp].display,
                height: logoArr[authUser.userComp].height,
              }}
              src={logoArr[authUser.userComp].logo}
              alt="CompanyLogo" />
          </UserLogo>
        }

        {/*when user signs up with a different company he gets (not 2) company's logo is rendered*/}

      </ListItem>

      <ListItem className="navbarItem">
        <Link to={ROUTES.HOME}>HOME</Link>
      </ListItem>

      {/*only logged in admins can see admin page*/}
      {!!authUser.roles[ROLES.ADMIN] && (
        <ListItem className="navbarItem">
          <Link to={ROUTES.ADMIN}>ADMIN</Link>
        </ListItem>
      )}

      {/*user profile picture becomes a link to his account*/}
      <ListItemRight className="navbarItem">
        <Link to={ROUTES.ACCOUNT}>
          <StyledImg title="Account" src={picArr[authUser.profilePic - 1]} alt="profile" />
        </Link>

        <SignOutButton name="sign out" setCustomStyle={setCustomStyle} />
      </ListItemRight>
    </ListInnerContainer>

    <BurgerNav setCustomStyle={setCustomStyle}></BurgerNav>
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
