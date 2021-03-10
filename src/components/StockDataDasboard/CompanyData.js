import { BarChart, Bar, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';


const CompanyData = ({ comp, companyTicker, getDate }) => {


    console.log('rendered company data');
    console.log(companyTicker, comp);

    const [stockData, setStockData] = useState([]);


    useEffect(() => {
        console.log('useEffect in company Data');

        fetch(`https://api.polygon.io/v2/aggs/ticker/${companyTicker}/range/1/day/2020-10-01/2021-03-09?unadjusted=true&sort=asc&limit=120&apiKey=skUrtuzSI4Dp7Zd6NOK8rEdIrxXHlq7Y`)
            .then(response => response.json())
            .then(data => {

                let arr = [];

                data.results.map(result => {
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
                    <div>
                        <ResponsiveContainer width="90%" height={300}>
                            <LineChart width={600} height={300} data={stockData} margin={{ top: 5, right: 20, bottom: 5, left: 70 }}>
                                <Line type="monotone" dataKey="price" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="time" tickLine={false} />
                                <YAxis tickLine={false} unit={comp.currency} />
                                <Tooltip />
                                <Legend />
                            </LineChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer width="90%" height={150}>
                            <BarChart width={600} height={300} data={stockData} margin={{ top: 5, right: 20, bottom: 5, left: 70 }}>
                                <Bar type="monotone" dataKey="volume" stroke="#8884d8" />
                                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                <XAxis dataKey="time" tickLine={false} />
                                <YAxis tickLine={false} />
                                <Tooltip />
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