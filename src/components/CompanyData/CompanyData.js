import { AreaChart, Area, BarChart, Bar, ReferenceLine, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import {
    yesterday,
    oneWeekAgo,
    oneMonthAgo,
    threeMonthsAgo,
    oneYearAgo,
    fiveYearsAgo,
    getDate
} from '../DatesAndTimes';
import GraphTitle from '../StockDataDasboard/GraphTitle';
import { twoDecim } from '../StockDataDasboard/GraphTitle';
import styled from 'styled-components';
import minMax from "../../img/minMax.png";
import minMaxActive from "../../img/minMaxActive.png";
import IntervalSpan from './IntervalSpan/IntervalSpan';

const StyledSection = styled.section`
width:100%;
max-width: 900px;
@media screen and (min-width: 950px){
border: 2px solid var(--gray);
padding-top: 15px;
border-radius: 20px;
}
`

const TitleWrapper = styled.div`
width: 95%;
margin: 0 auto;
display: flex;
flex-direction: column;
align-items: center;

div:first-child {
    margin-bottom: 5px;
}

small{
    color: var(--textGray);
}

.interval-parent {
    margin: 12px 0;

    @media screen and (min-width: 550px) {
        display: flex;
    }

    .time-interval{

        span {
            font-size: 16px;
            line-height: 16px;
            margin-right: 10px;
            padding: 2px 5px 3px 5px;
        }

        span:hover,
        span:active, 
        span:focus {
                background: var(--gray);
                border-radius: 7px;
                cursor: pointer;                
            }
        }    
    }   
    
    .graph-options {
        display: flex;
        margin: 0 auto;
        width: fit-content;
    }

    .select {
        font-size: 16px;
        line-height: 16px;
        width: 100px;
        //margin: 0 auto;
        border: 1px solid var(--gray);
        border-radius: 5px;
        padding: 1px 4px 2px 4px;
        cursor: pointer;
        background-color: var(--bgColor);
        background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

        select {
            width: 100%;
            border: none;
            cursor: pointer;
            outline: none;
        }        
    } 

    .min-max { 
        margin: 0 15px;
        span {
            width: fit-content;
            padding: 2px 5px 3px 5px;
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        span:active,
        span:focus {
            background: var(--gray);
            border-radius: 7px;
        }
        span:hover img {
            position:relative;
            top:-1.5px;
        }
        span img{
            height: 20px;            
        }
    }
    .active {
        background: var(--gray);
        border-radius: 7px;
        cursor: pointer;                
    }
}

@media screen and (min-width:550px) {
    align-items: flex-start;
}
`

const CompanyData = ({ comp, companyTicker }) => {

    //state for graph data
    const [stockData, setStockData] = useState([]);

    //states for minimum and maximum prices in the selected period
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);

    //state to show lines on graph related to maximum and minimum stock price
    const [minMaxLines, setMinMaxLines] = useState(false);

    //state for interval between datapoints
    const [optionsState, setOptionsState] = useState("1/minute");

    //state for entire time interval of graph data
    const [timeInterval, setTimeInterval] = useState(yesterday + "/" + yesterday);

    //APIs error is saved in a state
    const [error, setError] = useState(null);


    useEffect(() => {
        //API call for graph data
        fetch(`https://api.polygon.io/v2/aggs/ticker/${companyTicker}/range/${optionsState}/${timeInterval}?unadjusted=true&sort=asc&limit=5000&apiKey=skUrtuzSI4Dp7Zd6NOK8rEdIrxXHlq7Y`)
            .then(response => response.json())
            .then(data => {

                let arr = [];

                if (data.status === "OK" && data.results) {

                    //setting max price initial value to 0
                    let max = 0;
                    //setting min price initial value to first price in API data 
                    let min = twoDecim(data.results[0].c);

                    //mapping through rsults to create an array containing one graph point for each result object
                    //also setting min and max in .map
                    arr = data.results.map(result => {

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
                        return point
                    })

                    setMaxPrice(max);
                    setMinPrice(min);

                } else if (data.status === "ERROR" || !data.results) {
                    setError(data);
                } else console.log(data.status);
                setStockData(arr);
            })
    }, [companyTicker, optionsState, timeInterval])

    //dinamically changes graph x axis lower ticks depending on interval
    //eg:if the interval is one day, x axis will show hour points; if it is one year, x axis will show the month and the year 
    const changeXAxisTick = (tick) => {
        const timeArr = tick.split(" ");

        switch (timeInterval.split("/")[0]) {

            case yesterday:
                return timeArr[3];

            case oneYearAgo:
                return timeArr[1] + " " + timeArr[2];

            case fiveYearsAgo:
                return timeArr[1] + " " + timeArr[2];

            default:
                return timeArr[0] + " " + timeArr[1];
        }

    }

    //replace really long numbers with shorter variants eg. 100.000 with 10k
    const changeVolumeAxisTick = (value) => {
        let suffixes = ["", "k", "m", "b", "t"];
        let suffixNum = Math.floor(("" + value).length / 3);
        let shortValue = parseFloat((suffixNum !== 0 ? (value / Math.pow(1000, suffixNum)) : value).toPrecision(2));
        if (shortValue % 1 !== 0) {
            shortValue = shortValue.toFixed(1);
        }
        return shortValue + suffixes[suffixNum];
    }

    return (
        <StyledSection className="column-1-2">
            <TitleWrapper>
                {(stockData.length > 0) ?
                    <div>
                        <GraphTitle timeInterval={timeInterval} main={true} comp={comp} data={stockData} />

                    </div>
                    : null}
                <div className="interval-parent">
                    {/* Used one component for interval buttons */}
                    <div className="time-interval">

                        <IntervalSpan timeInterval={timeInterval} yesterday={yesterday} startTime={yesterday} defaultChecked={true} frequency="1/minute" setOptionsState={setOptionsState} setTimeInterval={setTimeInterval} text="1D" />

                        <IntervalSpan timeInterval={timeInterval} yesterday={yesterday} startTime={oneWeekAgo} defaultChecked={false} frequency="10/minute" setOptionsState={setOptionsState} setTimeInterval={setTimeInterval} text="1W" />

                        <IntervalSpan timeInterval={timeInterval} yesterday={yesterday} startTime={oneMonthAgo} defaultChecked={false} frequency="1/hour" setOptionsState={setOptionsState} setTimeInterval={setTimeInterval} text="1M" />

                        <IntervalSpan timeInterval={timeInterval} yesterday={yesterday} startTime={threeMonthsAgo} defaultChecked={false} frequency="1/day" setOptionsState={setOptionsState} setTimeInterval={setTimeInterval} text="3M" />

                        <IntervalSpan timeInterval={timeInterval} yesterday={yesterday} startTime={oneYearAgo} defaultChecked={false} frequency="1/month" setOptionsState={setOptionsState} setTimeInterval={setTimeInterval} text="1Y" />

                        <IntervalSpan timeInterval={timeInterval} yesterday={yesterday} startTime={fiveYearsAgo} defaultChecked={false} frequency="3/month" setOptionsState={setOptionsState} setTimeInterval={setTimeInterval} text="2Y" />

                    </div>
                    <div className="graph-options">
                        <div className="select">
                            <select value={optionsState} onChange={(event) => setOptionsState(event.target.value)}>
                                <option value="1/minute">1 minute</option>
                                <option value="5/minute">5 minutes</option>
                                <option value="10/minute">10 minutes</option>
                                <option value="30/minute">30 minutes</option>
                                <option value="1/hour">1 hour</option>
                                <option value="1/day">1 day</option>
                                <option value="1/week">1 week</option>
                                <option value="1/month">1 month</option>
                                <option value="3/month">3 months</option>
                            </select>
                        </div>
                        <div title="Show min-max" className="min-max">
                            <span className={minMaxLines ? "active" : " "} onClick={() => setMinMaxLines(!minMaxLines)}>
                                {!minMaxLines ? <img src={minMax} /> : <img src={minMaxActive} />}
                            </span>
                        </div>
                    </div>
                </div>
            </TitleWrapper>
            <div>
                {error && !(stockData.length > 0) && <h2>{error.error}</h2>}
                {error && !(stockData.length > 0) && (error.resultsCount === 0) && <h4>There are no results for the specified interval. Please choose another interval.</h4>}
                {(stockData.length > 0) ?
                    <div>
                        <ResponsiveContainer width="100%" height={300} >

                            <AreaChart width={600} height={300} data={stockData} margin={{ top: 5, right: 20, bottom: 20, left: 3 }}>
                                <defs>
                                    {/* Dessa värden kontrollerar färg och form på gradienten för grafen */}
                                    <linearGradient id="graphGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--secColor)" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="var(--mainColor)" stopOpacity={0.2} />
                                    </linearGradient>
                                </defs>
                                <Area type="linear" dataKey="price" stroke="var(--textColor)" name={comp.currency} dot={false} fill="url(#graphGradient)" strokeWidth={2} />

                                <CartesianGrid stroke="var(--gray)" strokeDasharray="1 1" />

                                <XAxis
                                    dataKey="time"
                                    stroke="var(--textGray)"
                                    axisLine={false}
                                    minTickGap={40}
                                    tickFormatter={(tick) => changeXAxisTick(tick)}
                                    style={{
                                        fontSize: '12px',
                                    }}
                                />

                                <YAxis
                                    tickLine={false}
                                    stroke="var(--textGray)"
                                    domain={[(twoDecim(minPrice * 0.99)), twoDecim(maxPrice * 1.01)]}
                                    axisLine={false}
                                    style={{
                                        fontSize: '12px',
                                    }}
                                />

                                <Tooltip contentStyle={{
                                    borderRadius: "10px",
                                    background: "#fff",
                                    fontWeight: "600",
                                }} />

                                <Scatter dataKey={minPrice} fill="red" />

                                {minMaxLines ?
                                    <ReferenceLine y={minPrice} stroke="red" label={"Min: " + minPrice + "$"} /> : null}
                                {minMaxLines ?
                                    <ReferenceLine y={maxPrice} label={"Max: " + maxPrice + "$"} stroke="red" /> : null}

                            </AreaChart>

                        </ResponsiveContainer>

                        <ResponsiveContainer width="100%" height={150}>

                            <BarChart width={600} height={300} data={stockData} margin={{ top: 5, right: 20, bottom: 20, left: 3 }}>

                                <Bar type="monotone" dataKey="volume" fill="#6b633d" name="Volume" />

                                <CartesianGrid stroke="var(--gray)" strokeDasharray="1 1" vertical={false} />

                                <XAxis
                                    dataKey="time"
                                    tickLine={false}
                                    stroke="var(--textGray)"
                                    minTickGap={40}
                                    tickFormatter={(tick) => changeXAxisTick(tick)}
                                />

                                <YAxis
                                    tickLine={false}
                                    axisLine={false}
                                    stroke="var(--textGray)"
                                    tickFormatter={(tick) => changeVolumeAxisTick(tick)}
                                />

                                <Tooltip
                                    cursor={{ fill: 'rgba(229, 229, 229, 0.4)' }}
                                    contentStyle={{
                                        borderRadius: "10px",
                                        background: "#fff",
                                        color: "var(--textLight)",
                                        fontWeight: "600",
                                    }} />

                                <Legend />

                            </BarChart>

                        </ResponsiveContainer>
                    </div>
                    : null
                }

            </div>
        </StyledSection>
    )
}

export default CompanyData