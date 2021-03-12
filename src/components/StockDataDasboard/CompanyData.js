import { AreaChart, Area, BarChart, Bar, LineChart, Line, Label, ReferenceLine, ReferenceArea, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';


const CompanyData = ({ comp, companyTicker, getDate }) => {
    const setFormat = (date) => {
        const day = date.getDate() - 1;
        const month = date.getMonth();
        const year = date.getFullYear();
        return year + "-" + (month + 1) + "-" + day;
    }

    const date = new Date();
    const yesterday = setFormat(date);

    const dayBeforeDate = new Date(date.setDate(date.getDate() - 1));
    const dayBefore = setFormat(dayBeforeDate);
    console.log(dayBefore);

    const oneWeekAgoDate = new Date(date.setDate(date.getDate() - 6));
    const oneWeekAgo = setFormat(oneWeekAgoDate);
    console.log(oneWeekAgo);

    date.setDate(date.getDate() + 7);

    const oneMonthAgoDate = new Date(date.setMonth(date.getMonth() - 1));
    const oneMonthAgo = setFormat(oneMonthAgoDate);
    console.log(oneMonthAgo);

    const threeMonthsAgoDate = new Date(date.setMonth(date.getMonth() - 2));
    const threeMonthsAgo = setFormat(threeMonthsAgoDate);
    console.log(threeMonthsAgo);

    const oneYearAgoDate = new Date(date.setMonth(date.getMonth() - 9));
    const oneYearAgo = setFormat(oneYearAgoDate);
    console.log(oneYearAgo);

    const fiveYearsAgoDate = new Date(date.setMonth(date.getMonth() - 48));
    const fiveYearsAgo = setFormat(fiveYearsAgoDate);
    console.log(fiveYearsAgo);




    console.log('rendered company data');

    const [stockData, setStockData] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);
    const [minMaxLines, setMinMaxLines] = useState(false);
    const [optionsState, setOptionsState] = useState("1/minute");
    const [interval, setInterval] = useState(`${dayBefore}/${yesterday}`);


    useEffect(() => {
        console.log('useEffect in company Data');
        fetch(`https://api.polygon.io/v2/aggs/ticker/${companyTicker}/range/${optionsState}/2021-01-01/2021-01-14?unadjusted=true&sort=asc&limit=2000&apiKey=skUrtuzSI4Dp7Zd6NOK8rEdIrxXHlq7Y`)
            .then(response => response.json())
            .then(data => {

                let arr = [];

                let max = 0;
                let min = data.results[0].c;

                data.results.map(result => {

                    if (result.c > max) {
                        max = result.c;
                    }

                    if (result.c < min) {
                        min = result.c;
                    }

                    const time = getDate(result.t);
                    let price = result.c;
                    let volume = result.v;
                    const point = {};
                    point.time = time.props.children;
                    point.price = price;
                    point.volume = volume;
                    arr.push(point);
                })

                setMaxPrice(max);
                setMinPrice(min);
                setStockData(arr);
            })
    }, [companyTicker, optionsState])

    return (
        <section>
            <h2><span>{comp.symbol}</span>: {comp.name}</h2>
            <h1>23.5{comp.currency}down arrw 1.2%, +0.2 today</h1>
            <div>
                <div onChange={(event) => setInterval(event.target.value)}>
                    <input type="radio" value="Male" name="gender" /> 1 D
                    <input type="radio" value="Female" name="gender" /> 1 W
                    <input type="radio" value="Other" name="gender" /> 1 M
                    <input type="radio" value="B" name="gender" /> 3 M
                    <input type="radio" value="x" name="gender" /> 1 Y
                    <input type="radio" value="n" name="gender" /> 5 Y
                </div>
                <span>{interval}</span>

                <select value={optionsState} onChange={(event) => setOptionsState(event.target.value)}>
                    <option value="1/minute" selected={optionsState === "1/minute"}>1 minute</option>
                    <option value="5/minute" selected={optionsState === "5/minute"}>5 minutes</option>
                    <option value="10/minute" selected={optionsState === "10/minute"}>10 minutes</option>
                    <option value="30/minute" selected={optionsState === "30/minute"}>30 minutes</option>
                    <option value="1/hour" selected={optionsState === "1/hour"}>1 hour</option>
                    <option value="1/day" selected={optionsState === "1/day"}>1 day</option>
                    <option value="1/week" selected={optionsState === "1/week"}>1 week</option>
                    <option value="1/month" selected={optionsState === "1/month"}>1 month</option>
                    <option value="3/month" selected={optionsState === "3/month"}>3 months</option>
                </select>
            </div>
            <div>

                {/* <form>
                    <span>Sort by:</span>
                    <label>
                        <input onChange={handleOptionChange} type="radio" value="closing" checked={priceType === 'closing'} defaultChecked={true} />
                            Closing
                        </label>
                    <label>
                        <input onChange={handleOptionChange} type="radio" value="high" checked={priceType === 'high'} />
                            High
                        </label>
                    <label>
                        <input onChange={handleOptionChange} type="radio" value="low" checked={priceType === 'low'} />
                            Low
                        </label>
                    <label>
                        <input onChange={handleOptionChange} type="radio" value="volume" checked={priceType === 'volume'} />
                            Volume
                        </label>
                    <p>{priceType}</p>
                </form> */}

                {/* {stockData.results.map(result => <p key={result.t} >{getDate(result.t)}: {result.c} {comp.currency}</p>)} */}
                {/* <p>Currency: {comp.currency}</p> */}
                {(stockData.length > 0) ?
                    <div style={{ background: "#FB6F5C" }}>
                        <ResponsiveContainer width="90%" height={300} >
                            <AreaChart width={600} height={300} data={stockData} margin={{ top: 5, right: 20, bottom: 5, left: 70 }}>
                                <Area type="linear" dataKey="price" stroke="#44062B" name="$" dot={false} fill="#f9897a" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
                                <XAxis dataKey="time" tickLine={false} stroke="#47E6B1" axisLine={false} />
                                <YAxis tickLine={false} unit={comp.currency} stroke="#47E6B1" domain={["dataMin - 1", "dataMax + 1"]} axisLine={false} >
                                    {/* <Label value={maxPrice + comp.currency} position="insideTop" offset={10} />
                                    <Label value={minPrice + comp.currency} position="insideBottom" /> */}
                                </YAxis>
                                <Tooltip contentStyle={{
                                    borderRadius: "10px",
                                    background: "#F2F2F2"
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
                                <Bar type="monotone" dataKey="volume" fill="#F2F2F2" name="Volume" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="1 1" vertical={false} />
                                <XAxis dataKey="time" tickLine={false} stroke="#47E6B1" />
                                <YAxis tickLine={false} axisLine={false} stroke="#47E6B1" />
                                <Tooltip
                                    cursor={{ fill: 'rgba(229, 229, 229, 0.4)' }}
                                    contentStyle={{
                                        borderRadius: "10px",
                                        background: "#FB6F5C"
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