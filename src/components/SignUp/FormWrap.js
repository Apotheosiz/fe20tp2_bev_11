import React from 'react'

import styled from 'styled-components';

export const FormWrap = styled.div`
    background-color: #F8C3C3;
    margin: auto;
    padding: 20px 0;
    max-width: 600px;
    width: 80%;
    border-radius: 16px;    
`;
class SignInFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hej: 44 };
    }
    onSubmit = event => {
        
    };
    onChange = event => {
       
    };
    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';
        return (
            <form onSubmit={this.onSubmit}>
                
                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export default SignInFormBase