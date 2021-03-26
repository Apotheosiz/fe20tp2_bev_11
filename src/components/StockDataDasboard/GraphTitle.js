import styled from 'styled-components';

export const twoDecim = (num) => {
    return  parseFloat((Math.round(num * 100) / 100).toFixed(2));
  };

const InfoLine = styled.h1`
span{
    margin-right: 7px;
}
`;

const GraphTitle = ({ comp, data }) => {

    const current = data[data.length - 1].price;
    const former = data[0].price;   
    const lastPrice = twoDecim(data[data.length - 1].price);
    const percDiff = twoDecim((current-former)/current*100.0);
    const diff = twoDecim(current-former);

return (<>
{/* {console.log(prev)} */}
    <h2> {comp.name}<span> ({comp.symbol})</span></h2>
    <InfoLine>
       
        <span>{lastPrice}{comp.currency}</span>

        <span>
            {percDiff >=0 ? 
                <span style={{ color: '#137333'}}>↑{percDiff}%</span>
                : <span style={{ color: '#a50e0e' }}>↓{percDiff}%</span>} 
                
            {(diff >= 0) ? 
                <span style={{ color: '#137333'}}>+{diff}</span> 
                : <span style={{ color: '#a50e0e' }}>{diff}</span>}
        </span>
    </InfoLine>
    </>
)
}

export default GraphTitle;
