import { AreaChart, Area, BarChart, Bar, LineChart, Line, ReferenceLine, ReferenceArea, Scatter, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';


const CompanyData = ({ comp, companyTicker, getDate }) => {


    console.log('rendered company data');
    console.log(companyTicker, comp);

    const [stockData, setStockData] = useState([]);
    const [maxPrice, setMaxPrice] = useState(0);
    const [minPrice, setMinPrice] = useState(0);


    useEffect(() => {
        console.log('useEffect in company Data');
        fetch(`https://api.polygon.io/v2/aggs/ticker/${companyTicker}/range/25/minute/2021-01-14/2021-01-15?unadjusted=true&sort=asc&limit=2000&apiKey=skUrtuzSI4Dp7Zd6NOK8rEdIrxXHlq7Y`)
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

                console.log(arr);
                setMaxPrice(max);
                setMinPrice(min);
                setStockData(arr);
            })
    }, [companyTicker])

    return (
        <section>
            <h2><span>{comp.symbol}</span>: {comp.name}</h2>
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
                                <Area type="monotone" dataKey="price" stroke="#44062B" name="$" dot={false} fill="#f9897a" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="1 1" />
                                <XAxis dataKey="time" tickLine={false} stroke="#47E6B1" />
                                <YAxis tickLine={false} unit={comp.currency} stroke="#47E6B1" domain={["dataMin", "dataMax"]} />
                                <Tooltip contentStyle={{
                                    borderRadius: "10px",
                                    background: "#F2F2F2"
                                }} />
                                <Scatter dataKey={minPrice} fill="red" />
                                {/* <ReferenceLine y={minPrice} stroke="red" label="Min" />
                                <ReferenceLine y={maxPrice} label="Max" stroke="red" /> */}
                            </AreaChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer width="90%" height={150}>
                            <BarChart width={600} height={300} data={stockData} margin={{ top: 5, right: 20, bottom: 5, left: 70 }}>
                                <Bar type="monotone" dataKey="volume" fill="#F2F2F2" name="Volume" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="1 1" vertical={false} />
                                <XAxis dataKey="time" tickLine={false} stroke="#47E6B1" />
                                <YAxis tickLine={false} axisLine={false} stroke="#47E6B1" />
                                <Tooltip contentStyle={{
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