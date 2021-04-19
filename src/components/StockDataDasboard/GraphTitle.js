import styled from 'styled-components';

export const twoDecim = (num) => {
  return parseFloat((Math.round(num * 100) / 100).toFixed(2));
};

const MainTitleWrapper = styled.div`
    display: ${props => props.main ? "flex" : "block"};
    flex-direction: column;
    align-items: center;
    @media screen and (min-width: 550px) {
        display: block;
    }
`

const MainTitle = styled.h2`
font-weight: 500;
span{    
    background: var( --gray);
    border-radius: 7px;
    font-size: 20px;
    padding: 2px 5px 3px 5px;
}
`
const SmallInfo = styled.div`
margin-bottom: 15px;
`

const InfoLine = styled.h1`
.last-price{
    font-size: ${props => props.main ? "30px" : "inherit"};
    font-weight: ${props => props.main ? "400" : "bold"};
    margin-right: ${props => props.main ? "20px" : "0"};
    @media screen and (min-width: 550px) {
        font-size: ${props => props.main ? "50px" : "inherit"};
    }
}

span{
    margin-right: ${props => props.main ? " 10px " : "7px"};
}
`;

const GraphTitle = ({ timeInterval, main, comp, data }) => {

  const current = data[data.length - 1].price;
  const former = data[0].price;
  const lastPrice = twoDecim(data[data.length - 1].price);
  const percDiff = twoDecim((current - former) / current * 100.0);
  const diff = twoDecim(current - former);

  return (<MainTitleWrapper main={main}>

    {main ? <>
      <MainTitle>{comp.name} <span> {comp.symbol}</span></MainTitle>
      {comp.exchangeShortName &&
        <SmallInfo>
          {/* Styled in CompanyData titleWrapper */}
          <small>{comp.stockExchange} • </small><small>{timeInterval}</small>
        </SmallInfo>
      }
    </>
      : <h2> {comp.name} <span> ({comp.symbol})</span></h2>}
    <InfoLine main={main} >

      <span className="last-price">{lastPrice} {comp.currency}</span>

      <span>
        {percDiff >= 0 ?
          <span style={{ color: '#137333', background: '#e6f4ea', borderRadius: '5px', padding: '1px' }}>↑{percDiff}%</span>
          : <span style={{ color: '#a50e0e', background: '#fce8e6', borderRadius: '5px', padding: '1px' }}>↓{percDiff}%</span>}

        {(diff >= 0) ?
          <span style={{ color: '#137333' }}>+{diff}</span>
          : <span style={{ color: '#a50e0e' }}>{diff}</span>}
      </span>
    </InfoLine>
  </MainTitleWrapper>
  )
}

export default GraphTitle;
