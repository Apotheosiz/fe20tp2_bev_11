import React, { Component } from 'react';
import styled from 'styled-components';

export const StyledButton = styled.button`
    background: none;
    background-color: var(--mainColor);
	color: inherit;
	border: none;
	padding: 10px;
	font: inherit;
	cursor: pointer;
	outline: inherit;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    border: none;
    border-radius: 15px;
    font-size: 22px;
    width: ${props => props.width ? props.width : "80%"};
    max-width: ${props => props.maxWidth ? props.maxWidth : "500px"};
    text-transform: uppercase;
    &:hover{
        background: var(--secColor); 
        color: var(--textLight);
    }
`;

class Button extends Component { 

    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() {  

        return (  
                <StyledButton className="Button" width={this.props.width} maxWidth={this.props.maxWidth}>
                    {this.props.children}
                </StyledButton>   
        );
    }
}
 
export default Button;