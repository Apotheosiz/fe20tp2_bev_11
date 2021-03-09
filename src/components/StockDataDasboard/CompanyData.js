import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';

//{ name: 'Page A', uv: 200, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page C', uv: 300, pv: 2400, amt: 2400 }

const CompanyData = ({ comp, stockData, getDate }) => {
    // console.log(stockData);
    const data = [];
    const [priceType, setPriceType] = useState("closing");

    const handleOptionChange = (event) => {
        setPriceType(event.target.value);
    }

    useEffect(() => {
        stockData.results.map(result => {
            const time = getDate(result.t);
            let price = 0;
            if (priceType === 'closing') {
                price = result.c;
            } else if (priceType === 'high') {
                price = result.h;
            } else if (priceType === 'low') {
                price = result.l;
            } else if (priceType === 'volume') {
                price = result.v;
            }

            const point = {};
            point.time = time.props.children;
            point.price = price;
            data.push(point);
        })
    }, [priceType])

    return (
        <section>
            <h2><span>{comp.symbol}</span>: {comp.name}</h2>
            <div>
                <form>
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
                </form>

                {/* {stockData.results.map(result => <p key={result.t} >{getDate(result.t)}: {result.c} {comp.currency}</p>)} */}
                {/* <p>Currency: {comp.currency}</p> */}
                <ResponsiveContainer width="90%" height={300}>
                    <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
                        <Line type="monotone" dataKey="price" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="time" tickLine={false} />
                        <YAxis tickLine={false} unit={comp.currency} />
                        <Tooltip />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    )
}

export default CompanyData