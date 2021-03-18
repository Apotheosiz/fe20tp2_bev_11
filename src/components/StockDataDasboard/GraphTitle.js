const GraphTitle = ({ comp, data }) => {

    const current = data[data.length - 1].price;
    const former = data[0].price;

  
    // const prev = data[data.length - 1].time.split(', ');
    const twoDecim = (num) => {
      return  (Math.round(num * 100) / 100).toFixed(2);
    }

    const lastPrice = twoDecim(data[data.length - 1].price);
    const percDiff = twoDecim((current-former)/current*100.0);
    const diff = twoDecim(current-former);
return (<>
{/* {console.log(prev)} */}
    <h2><span>{comp.symbol}</span>: {comp.name}</h2>
    <h1>
        {lastPrice}{comp.currency} 

        {percDiff >=0 ? 
            <span style={{ color: '#137333'}}>↑{percDiff}%</span>
            : <span style={{ color: '#a50e0e' }}>↓{percDiff}%</span>} 
            
        {(diff >= 0) ? 
            <span style={{ color: '#137333'}}>+{diff}{comp.currency}</span> 
            : <span style={{ color: '#a50e0e' }}>{diff}{comp.currency}</span>}
            
    </h1>
    </>
)
}

export default GraphTitle;
