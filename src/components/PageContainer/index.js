import React, { Component } from 'react';

import styled from 'styled-components'

const StyledPageContainer = styled.div`
    padding-top: 15px;
    height: 93.25vh;
    background-color: #FB6F5C;
    text-align: center;
    font-family: 'Saira Condensed', sans-serif;
`;

class PageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <StyledPageContainer>
                {this.props.children}
            </StyledPageContainer>
        );
    }
}
 
export default PageContainer;