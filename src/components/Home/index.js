import React, { useState } from 'react';
import { compose } from 'recompose';
import {
  AuthUserContext,
  withAuthorization,
} from '../Session';
import StockDataDashboard from '../StockDataDasboard';
import NewsDashbord from '../NewsDashbord';
import Messages from '../Messages';
import CompanyData from '../CompanyData/CompanyData';
import styled from "styled-components";

const HomeLayout = styled.div`
//using grid for main layout
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

  //state containing data about the company that appears in the main graph
  const [comp, setComp] = useState({
    currency: 'USD',
    exchangeShortName: 'NASDAQ',
    name: 'Apple Inc.',
    stockExchange: 'NasdaqGS',
    symbol: 'AAPL',
  });
  //state containing ticker of company that appears in the main graph
  const [companyTicker, setCompanyTicker] = useState('AAPL');

  //adding grid classes depending on screen width(do not work on resize)
  const screenWidth = window.innerWidth;
  let messagesDivClasses = "column-1-2";
  let newsDivClasses = "column-1-2";
  if (screenWidth > 1024) {
    messagesDivClasses = "justify-start";
    newsDivClasses = "justify-end";
  }

  return (
    <HomeLayout>
      <AuthUserContext.Consumer>

        {/*stock data search field and previews but not graph */}
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

      {/*stock data graph component */}
      {(comp && companyTicker) ?
        <CompanyData comp={comp} companyTicker={companyTicker} />
        : null
      }

      <NewsDashbord comp={comp} newsDivClasses={newsDivClasses} />

      {/*messages field component */}
      <AuthUserContext.Consumer>
        {authUser => (
          <Messages messagesDivClasses={messagesDivClasses} authUser={authUser} />
        )}
      </AuthUserContext.Consumer>

    </HomeLayout>
  )
};

const condition = authUser => !!authUser;

export default compose(
  withAuthorization(condition),
)(HomePage);