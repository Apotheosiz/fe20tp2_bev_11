import React, { Component } from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
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
    font-size: 22px;
    width: 150px;
`;


class Button extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (
            <StyledButton className="Button">
                {this.props.children}
            </StyledButton>
         );
    }
}
 
export default Button;