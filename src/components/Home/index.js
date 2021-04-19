import React, { Component, useState } from 'react';
import { compose } from 'recompose';
import {
    AuthUserContext,
    withAuthorization,
} from '../Session';
import { withFirebase } from '../Firebase';
import StockDataDashboard from '../StockDataDasboard';
import NewsDashbord from '../NewsDashbord';
import Messages from '../Messages';
import CompanyData from '../CompanyData/CompanyData';
import styled from "styled-components";

const HomeLayout = styled.div`
display:grid;
grid-template-columns: 2fr 1fr;
grid-template-rows: auto auto auto;
align-items: start;
justify-items:center;
grid-gap: 15px;
.column-1-2{
    grid-column: 1 / span 2;;
}
.justify-end{
    justify-self:end;
}
.justify-start{
    justify-self:start;
}
`

const HomePage = () => { 
    const [comp, setComp] = useState({
        currency: 'USD',
        exchangeShortName: 'NASDAQ',
        name: 'Apple Inc.',
        stockExchange: 'NasdaqGS',
        symbol:'AAPL',
    }); 
    const [companyTicker, setCompanyTicker] = useState('AAPL');

    const screenWidth = window.innerWidth;
    let messagesDivClasses = "column-1-2";
    let newsDivClasses = "column-1-2";
    if (screenWidth > 1024) {
        messagesDivClasses = "justify-start";
        newsDivClasses = "justify-end";
    }
    
    return   (
    <HomeLayout>
        <AuthUserContext.Consumer>
            {authUser => (
                    <StockDataDashboard
                        authUser={authUser} 
                        comp={comp} 
                        setComp={setComp}
                        setCompanyTicker={setCompanyTicker}
                        companyTicker={companyTicker}
                    />
            )}
        </AuthUserContext.Consumer>
        
        {(comp && companyTicker) ?
                <CompanyData comp={comp} companyTicker={companyTicker} />
                : null
            }

        <NewsDashbord comp={comp} newsDivClasses={newsDivClasses} />

        <AuthUserContext.Consumer>
            {authUser => (
                <Messages messagesDivClasses={messagesDivClasses} authUser={authUser} />
            )}
        </AuthUserContext.Consumer>
        
    </HomeLayout>
)};

const condition = authUser => !!authUser;

export default compose(
    withAuthorization(condition),
)(HomePage);