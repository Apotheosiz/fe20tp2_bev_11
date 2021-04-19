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
padding: 10px 7px;
margin: 0 7px 7px 0;
background: var(--gray);
border-radius: 10px;
position: relative;
cursor: pointer;
border: ${props => props.isActive ? "2px solid var(--textColor);" : "none"};

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
  color: #a4a4a4;
  &:hover{
    color: #5c6065;
  }
}
`

const PreviewItem = ({ graphTicker, user, comp, ticker, setCompanyTicker, setComp, delTicker }) => {

  const [stockData, setStockData] = useState(null);
  const [actualStockData, setActualStockData] = useState(null);
  const [color, setColor] = useState("#f9897a");
  const interval = `10/minute/${yesterday}/${yesterday}`;

  //using a different api key for previews
  useEffect(() => {
    fetch(`https://api.polygon.io/v2/aggs/ticker/${ticker}/range/${interval}?unadjusted=true&sort=asc&limit=5000&apiKey=xDToCZJHm7pBpVlUiM8vcrK75nKJrpGV`)
      .then(response => response.json())
      .then(data => {

        let arr = [];

        if (data.status === "OK" && data.results) {

          let min = twoDecim(data.results[0].c);

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

          arr = data.results.map(result => {
            /*subtracting min price from all datapoints prices in order to 
            start graph from 0 to keep graphs relevent when pice differences are high*/
            const closePrice = twoDecim(result.c - min);

            const time = getDate(result.t);
            let price = closePrice;
            let volume = result.v;
            const point = {};
            point.time = time;
            point.price = price;
            point.volume = volume;
            return point
          });

          //make decreasing stocks red and increasing ones green
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

        <ItemWrapper isActive={(graphTicker === ticker)} className="prevLink"  >
          <div className="seeInGraph" data-ticker={ticker} data-comp={JSON.stringify(comp)} onClick={(event) => {
            setCompanyTicker(event.target.closest('.seeInGraph').dataset.ticker);
            setComp(JSON.parse(event.target.closest('.seeInGraph').dataset.comp));
          }}>

            {(actualStockData.length > 0) ?
              <GraphTitle comp={comp} data={actualStockData} />
              : null}

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
          </div>}

        </ItemWrapper>
      }
    </div>)
}

export default PreviewItem;