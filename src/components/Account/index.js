import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { compose } from 'recompose';
import {
    AuthUserContext,
    withAuthorization,
} from '../Session';
import PageContainer from '../PageContainer';


const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <PageContainer>
                <h1>Account: {authUser.email} {/*Object.keys(authUser.symbols)*/}</h1>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </PageContainer>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
    withAuthorization(condition),
)(AccountPage);