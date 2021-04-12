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

const AccountStyledButton = styled(StyledButton)`
background-color:${props => props.color ? "#F8C3C3" : "#efefef"} ;
margin-bottom: 20px;
`

const StyledTitle = styled(Title)`
margin-bottom: 40px;
`


const AccountPage = () => {
    const [isActive, setIsActive] = useState(false)

    return (
    <AuthUserContext.Consumer>
        {authUser => (
            <PageContainer>
                <StyledTitle>{authUser.email} {/*Object.keys(authUser.symbols)*/}</StyledTitle>
                <SettingsPic />
                <AccountStyledButton width="fit-content" color={isActive? true : false} onClick={() => {
                    setIsActive(!isActive);
                }}>change my password{isActive ? <span>▲</span> : <span>▼</span>  }</AccountStyledButton>
                {isActive ? <PasswordChangeForm /> : null}
            </PageContainer>
        )}
    </AuthUserContext.Consumer>
)};

const condition = authUser => !!authUser;

export default compose(
    withAuthorization(condition),
)(AccountPage);