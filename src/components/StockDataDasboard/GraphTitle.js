import styled from 'styled-components';

export const twoDecim = (num) => {
    return  parseFloat((Math.round(num * 100) / 100).toFixed(2));
  };

const MainTitle = styled.h2`
font-weight: 500;
span{

}
`

const InfoLine = styled.h1`
.last-price{
    font-size: ${props => props.main ? " 50px " : "inherit"};
    font-weight: ${props => props.main ? " 400 " : "bold"};
}

span{
    margin-right: 7px;
}
`;

const GraphTitle = ({ main, comp, data }) => {

    const current = data[data.length - 1].price;
    const former = data[0].price;   
    const lastPrice = twoDecim(data[data.length - 1].price);
    const percDiff = twoDecim((current-former)/current*100.0);
    const diff = twoDecim(current-former);

return (<div>
{/* {console.log(prev)} */}
    {main ? 
        <MainTitle>{comp.name} <span> ({comp.symbol})</span></MainTitle>
        : <h2> {comp.name} <span> ({comp.symbol})</span></h2>}
    <InfoLine main={main} >
       
        <span className="last-price">{lastPrice}{comp.currency}</span>

        <span>
            {percDiff >=0 ? 
                <span style={{ color: '#137333', background: '#e6f4ea', borderRadius: '5px', padding:'1px' }}>↑{percDiff}%</span>
                : <span style={{ color: '#a50e0e', background: '#fce8e6', borderRadius: '5px', padding:'1px' }}>↓{percDiff}%</span>} 
                
            {(diff >= 0) ? 
                <span style={{ color: '#137333'}}>+{diff}</span> 
                : <span style={{ color: '#a50e0e' }}>{diff}</span>}
        </span>
    </InfoLine>
    </div>
)
}

export default GraphTitle;
