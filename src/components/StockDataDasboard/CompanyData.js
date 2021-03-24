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
import GraphTitle from './GraphTitle';
import { twoDecim } from './GraphTitle';

// console.log(yesterday);


const CompanyData = ({ comp, companyTicker }) => {

    console.log('rendered company data');

    const [stockData, setStockData] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [minMaxLines, setMinMaxLines] = useState(false);
    const [optionsState, setOptionsState] = useState("1/minute");
    const [interval, setInterval] = useState(yesterday + "/" + yesterday);
    const [error, setError] = useState(null);


    useEffect(() => {
        console.log('useEffect in company Data');
        fetch(`https://api.polygon.io/v2/aggs/ticker/${companyTicker}/range/${optionsState}/${interval}?unadjusted=true&sort=asc&limit=5000&apiKey=skUrtuzSI4Dp7Zd6NOK8rEdIrxXHlq7Y`)
            .then(response => response.json())
            .then(data => {

                let arr = [];

                if (data.status === "OK" && data.results) {
                    // console.log('data status ok');

                    let max = 0;
                    let min = twoDecim(data.results[0].c);

                    // console.log(data);
                    data.results.map(result => {

                    const closePrice = result.c;

                        if (closePrice > max) {
                            max = closePrice;
                        }

                        if (closePrice < min) {
                            min = closePrice;
                        }

                        const time =getDate(result.t);
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
            })
    }, [companyTicker, optionsState, interval])

    const changeXAxisTick = (tick) => {
        const timeArr = tick.split(" ");

        switch (interval.split("/")[0]) {

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

    return (
        <section>
            {(stockData.length > 0) ?
                <GraphTitle comp={comp} data={stockData} />
                : null }
            <div>
                <div onChange={(event) => setInterval(event.target.value)}>
                    <input 
                        type="radio" 
                        value={yesterday + "/" + yesterday} 
                        name="gender" defaultChecked={true}
                        onClick={() => setOptionsState("1/minute")}
                     /> 1 D
                    <input 
                        type="radio" 
                        value={oneWeekAgo + "/" + yesterday} 
                        name="gender"
                        onClick={() => setOptionsState("10/minute")}
                    /> 1 W
                    <input 
                        type="radio" 
                        value={oneMonthAgo + "/" + yesterday} 
                        name="gender" 
                        onClick={() => setOptionsState("1/hour")}
                    /> 1 M
                    <input 
                        type="radio" 
                        value={threeMonthsAgo + "/" + yesterday} 
                        name="gender" 
                        onClick={() => setOptionsState("1/day")}
                        /> 3 M
                    <input 
                        type="radio" 
                        value={oneYearAgo + "/" + yesterday} 
                        name="gender" 
                        onClick={() => setOptionsState("1/month")}
                        /> 1 Y
                    <input 
                        type="radio" 
                        value={fiveYearsAgo + "/" + yesterday} 
                        name="gender"
                        onClick={() => setOptionsState("3/month")}
                        /> 2 Y
                </div>
                <span>{interval}</span>

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
            <div>
                {error && !(stockData.length > 0) && <h2>{error.error}</h2>}
                {error && !(stockData.length > 0) && (error.resultsCount === 0) && <h4>There are no results for the specified interval. Please choose another interval.</h4>}
                {(stockData.length > 0) ?
                    <div>
                        {/* {console.log(stockData)} */}
                        <ResponsiveContainer width="100%" height={300} >

                            <AreaChart width={600} height={300} data={stockData} margin={{ top: 5, right: 20, bottom: 5, left: 25 }}>

                                <Area type="linear" dataKey="price" stroke="#44062B" name={comp.currency} dot={false} fill="#f9897a" strokeWidth={2} />

                                <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />

                                <XAxis 
                                    dataKey="time"  
                                    stroke="#5f6368" 
                                    axisLine={false} 
                                    minTickGap={180}
                                    tickFormatter={(tick) => changeXAxisTick(tick)}  
                                />

                                <YAxis 
                                    tickLine={false} 
                                    stroke="#5f6368" 
                                    domain={[(twoDecim(minPrice*0.99)) , twoDecim(maxPrice*1.01)]} 
                                    axisLine={false}  
                                />

                                <Tooltip contentStyle={{
                                    borderRadius: "10px",
                                    background: "#F2F2F2",
                                    fontWeight: "600",
                                }} />

                                <Scatter dataKey={minPrice} fill="red" />

                                {minMaxLines ?
                                    <ReferenceLine y={minPrice} stroke="red" label={"Min: " + minPrice + "$"} /> : null}
                                {minMaxLines ?
                                    <ReferenceLine y={maxPrice} label={"Max: " + maxPrice + "$"} stroke="red" /> : null}

                            </AreaChart>

                        </ResponsiveContainer>
                        <div>
                            <span onClick={() => setMinMaxLines(!minMaxLines)}>
                                {!minMaxLines ? <span>Show </span> : <span>Hide </span>}
                        min and max</span>
                        </div>
                        <ResponsiveContainer width="90%" height={150}>

                            <BarChart width={600} height={300} data={stockData} margin={{ top: 5, right: 20, bottom: 5, left: 70 }}>

                                <Bar type="monotone" dataKey="volume" fill="#47E6B1" name="Volume" />

                                <CartesianGrid stroke="#ccc" strokeDasharray="1 1" vertical={false} />

                                <XAxis dataKey="time" tickLine={false} stroke="#5f6368" />

                                <YAxis tickLine={false} axisLine={false} stroke="#5f6368" />

                                <Tooltip
                                    cursor={{ fill: 'rgba(229, 229, 229, 0.4)' }}
                                    contentStyle={{
                                        borderRadius: "10px",
                                        background: "#808080",
                                        color: "#fff",
                                        fontWeight: "600",
                                    }} />

                                <Legend />

                            </BarChart>
                            
                        </ResponsiveContainer>
                    </div>
                    : null
                }

            </div>
        </section>
    )
}

export default CompanyData