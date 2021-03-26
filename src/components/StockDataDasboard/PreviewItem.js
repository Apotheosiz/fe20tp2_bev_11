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
width: 220px;
padding:0 7px;
margin: 0 7px 7px 0;
background: #efefef;
border-radius: 10px;
position: relative;

.seeInGraph{
    display: flex;
    align-items: center;
    justify-content:space-between;
}

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
.deleteIcon{
    position: absolute;
    top: -4px;
    right: 4px;
    font-size: 17px;
    font-weight: 800;
    cursor: pointer;
}
`

const Details = styled.div`

`;

const PreviewItem = ({ user, comp, ticker, setCompanyTicker, setComp, delTicker }) => {  
    
    const [stockData, setStockData] = useState(null);
    const [actualStockData, setActualStockData] = useState(null);
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
                    const arrForTitle = data.results.map(result => {
                        
                        const closePrice = result.c;

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

                        return point;

                    });

                    setActualStockData(arrForTitle);
                    console.log(arrForTitle);

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
            
            <ItemWrapper className="prevLink"  >
                <div className="seeInGraph" data-ticker={ticker} data-comp={JSON.stringify(comp)} onClick={(event) => { 
                setCompanyTicker(event.target.closest('.seeInGraph').dataset.ticker);
                setComp(JSON.parse(event.target.closest('.seeInGraph').dataset.comp));
            }}>
                    <Details>{(actualStockData.length > 0) ?
                        <GraphTitle comp={comp} data={actualStockData} />
                        : null }
                    </Details>
                    
                    <LineChart width={80} height={40} data={stockData}>
                        <Line type="linear" dataKey="price" stroke={color} strokeWidth={2} dot={false} />
                    </LineChart>
                </div>

                {(Object.keys(user.tickers).length > 1) 
                &&
                <div data-ticker={ticker}
                    className="deleteIcon" 
                    onClick={(event) => delTicker(event.target.dataset.ticker)}
                >
                    ×
                    {/* <svg height="18" viewBox="0 0 48 48" width="48" xmlns="http://www.w3.org/2000/svg">
                        <title>Remove</title>
                        <path d="M12 38c0 2.21 1.79 4 4 4h16c2.21 0 4-1.79 4-4V14H12v24zM38 8h-7l-2-2H19l-2 2h-7v4h28V8z"/><path d="M0 0h48v48H0z" fill="none"/>
                    </svg> */}
                </div>
                }
                

            </ItemWrapper>
        }
    </div>)
}

export default PreviewItem;