import { LineChart, Line, ResponsiveContainer, AreaChart, Area, BarChart, Bar, ReferenceLine, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import {
    yesterday,
    oneWeekAgo,
    oneMonthAgo,
    threeMonthsAgo,
    oneYearAgo,
    fiveYearsAgo,
    getDate
} from '../DatesAndTimes';
import { useState, useEffect } from 'react';
import GraphTitle from './GraphTitle';
import { twoDecim } from './GraphTitle';
import styled from "styled-components";


const MiniGraphTitle = styled(GraphTitle)`
`;

const PreviewItem = ({comp, ticker}) => {
    // let interval = '';
  
    
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState(null);
    const [color, setColor] =useState("#f9897a");
    const interval =`10/minute/${yesterday}/${yesterday}`;

//   if (comp.interval === '1D') {
//         setInterval(`1/minute/${yesterday}/${yesterday}`);
//     }
    console.log('rendered preview item');
    useEffect(() => {
        console.log('useEffect in preview Item');
        fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${interval}?unadjusted=true&sort=asc&limit=5000&apiKey=skUrtuzSI4Dp7Zd6NOK8rEdIrxXHlq7Y`)
            .then(response => response.json())
            .then(data => {

                let arr = [];

                if (data.status === "OK" && data.results) {

                    let max = 0;
                    let min = twoDecim(data.results[0].c);

                    console.log('data status ok');
                    console.log(data);
                    data.results.map(result => {
                        const closePrice = result.c;

                        if (closePrice > max) {
                            max = closePrice;
                        }

                        if (closePrice < min) {
                            min = closePrice;
                        }

                        const time = getDate(result.t);
                        let price = closePrice;
                        let volume = result.v;
                        const point = {};
                        point.time = time;
                        point.price = price;
                        point.volume = volume;
                        arr.push(point);
                    })

                    setMaxPrice(max);
                    setMinPrice(min);

                } else if (data.status === "ERROR" || !data.results) {
                    setError(data);
                } else console.log(data.status);
                setStockData(arr);
                console.log(arr);
            })
    }, [ticker, interval])

    return (<div>
         {/* {(stockData.length > 0) ?
                <GraphTitle comp={comp} data={stockData} />
                : null } */}
                {/* {error && !(stockData.length > 0) && <h2>{error.error}</h2>} */}
                {/* {error && !(stockData.length > 0) && (error.resultsCount === 0) && <h4>There are no results for the specified interval.</h4>} */}
                {console.log(stockData)}
                {stockData && 
                    <div style={{ width:"120px", background:"pink"}}>
                        <p>{(stockData.length > 0) ?
                            <MiniGraphTitle comp={comp} data={stockData} />
                            : null }</p>
                        {/* <ResponsiveContainer width="100%" height={100} >  */}
                            <LineChart width={100} height={60} data={stockData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }} >
                                <Line type="linear" dataKey="price" stroke="#44062B" strokeWidth="1.5px" name="$" dot={false} fill={color} />
                                <XAxis dataKey="time" tickLine={false} stroke="#5f6368" axisLine={false} tick={false} />
                                <YAxis tickLine={false} unit={comp.currency} stroke="#5f6368" domain={[(twoDecim(minPrice*0.99)) , twoDecim(maxPrice*1.01)]} axisLine={false} tick={false} >
                                    {/* <Label value={maxPrice + comp.currency} position="insideTop" offset={10} />
                                    <Label value={minPrice + comp.currency} position="insideBottom" /> */}
                                </YAxis>
                                <Scatter dataKey={minPrice} fill="red" />
                            </LineChart>
                        {/* </ResponsiveContainer>  */}
                     </div>
                }

        one little company</div>)
}

export default PreviewItem;