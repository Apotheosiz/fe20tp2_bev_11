import React from 'react';
import { withFirebase } from '../Firebase';

import styled from 'styled-components';

const Button = styled.button`
    /* Adapt the colors based on primary prop */
    background: ${props => props.primary ? "palevioletred" : "white"};
    color: ${props => props.primary ? "white" : "palevioletred"};

    background: none;
	color: inherit;
	border: none;
	padding: 10px;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    background-color: #F8C3C3;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 15px;
`;


const SignOutButton = ({ firebase }) => (
    <Button type="button" onClick={firebase.doSignOut}>
        Sign Out
    </Button>
);
export default withFirebase(SignOutButton);