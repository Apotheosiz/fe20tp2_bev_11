import React, { useState } from 'react';
import PasswordChangeForm from '../PasswordChange';
import { compose } from 'recompose';
import {
  AuthUserContext,
  withAuthorization,
} from '../Session';
import PageContainer from '../PageContainer';
import { Title } from '../SignIn';
import { StyledButton } from '../Button';
import styled from "styled-components";
import { SettingsPic } from '../svgImg/WelcomePic';
import { FormWrap } from '../SignUp/FormWrap';

const StyledFormWrap = styled(FormWrap)`
width:250px;
margin-bottom:15px;
font-size: 22px;
padding: 10px;
`

const AccountStyledButton = styled(StyledButton)`
background-color:${props => props.color ? props.color : 'var(--gray)'} ;
margin-bottom: 20px;
`

const StyledTitle = styled(Title)`
margin: 40px auto;
`


const AccountPage = () => {
  //opens and closes change password form
  const [isActive, setIsActive] = useState(false)

  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <PageContainer>
          <StyledTitle>Account settings</StyledTitle>
          <SettingsPic />
          <StyledFormWrap>{authUser.email}</StyledFormWrap>
          <AccountStyledButton width="250px" color={isActive ? "var(--mainColor)" : false} onClick={() => {
            setIsActive(!isActive);
          }}>change my password{isActive ? <span>▲</span> : <span>▼</span>}</AccountStyledButton>
          {isActive ? <PasswordChangeForm /> : null}
        </PageContainer>
      )}
    </AuthUserContext.Consumer>
  )
};

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(AccountPage);