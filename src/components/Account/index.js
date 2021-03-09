import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { compose } from 'recompose';
import {
    AuthUserContext,
    withAuthorization,
} from '../Session';


const AccountPage = () => (
    <AuthUserContext.Consumer>
        {authUser => (
            <div>
                <h1>Account: {authUser.email} {/*Object.keys(authUser.symbols)*/}</h1>
                <PasswordForgetForm />
                <PasswordChangeForm />
            </div>
        )}
    </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default compose(
    withAuthorization(condition),
)(AccountPage);