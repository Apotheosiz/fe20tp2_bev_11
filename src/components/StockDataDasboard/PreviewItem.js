import { LineChart, Line } from 'recharts';
import {
    yesterday,
    getDate
} from '../DatesAndTimes';
import { useState, useEffect } from 'react';
import GraphTitle from './GraphTitle';
import { twoDecim } from './GraphTitle';
import styled from "styled-components";

const ItemWrapper = styled.div`
display: flex;
align-items: center;
justify-content:space-between;
width: 220px;
padding:0 7px;
margin: 0 7px 7px 0;
background: #efefef;
border-radius: 10px;

h1{
    font-size: 12px;
    display: flex;
    flex-direction: column;
}

h2{
    font-size: 12px;
    white-space: nowrap;
    max-width: 120px;
    overflow: hidden;
    span{
        display: none;
    }
}
`

const DetailsLines = styled.div`

`;

const PreviewItem = ({comp, ticker}) => {  
    
    const [stockData, setStockData] = useState(null);
    const [color, setColor] =useState("#f9897a");
    const interval =`10/minute/${yesterday}/${yesterday}`;

//   if (comp.interval === '1D') {
//         setInterval(`1/minute/${yesterday}/${yesterday}`);
//     }
    console.log('rendered preview item');
    useEffect(() => {
        console.log('useEffect in preview Item');
        fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${interval}?unadjusted=true&sort=asc&limit=5000&apiKey=xDToCZJHm7pBpVlUiM8vcrK75nKJrpGV`)
            .then(response => response.json())
            .then(data => {

                let arr = [];

                if (data.status === "OK" && data.results) {

                    let min = twoDecim(data.results[0].c);

                    console.log('data status ok');
                    console.log(data);
                    data.results.map(result => {
                        
                        const closePrice = result.c;

                        if (closePrice < min) {
                            min = closePrice;
                        }

                    });

                    data.results.map(result => {

                        const closePrice = twoDecim(result.c - min);

                        const time = getDate(result.t);
                        let price = closePrice;
                        let volume = result.v;
                        const point = {};
                        point.time = time;
                        point.price = price;
                        point.volume = volume;
                        arr.push(point);
                    });

                    console.log(arr);

                    if (arr[arr.length - 1].price > arr[0].price) {
                        setColor('#137333');
                    } else if (arr[arr.length - 1].price < arr[0].price) {
                        setColor('#a50e0e');
                    } 

                    setStockData(arr);
                } else console.log(data.status);
                 
            })
    }, [ticker, interval])

    return (
    <div>
        {stockData && 
            
            <ItemWrapper>

                <DetailsLines>{(stockData.length > 0) ?
                    <GraphTitle comp={comp} data={stockData} />
                    : null }
                </DetailsLines>
                
                <LineChart width={80} height={40} data={stockData}>
                    <Line type="linear" dataKey="price" stroke={color} strokeWidth={2} dot={false} />
                </LineChart>

            </ItemWrapper>
        }
    </div>)
}

export default PreviewItem;