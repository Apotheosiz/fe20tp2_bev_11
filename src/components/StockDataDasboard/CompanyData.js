import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

//{ name: 'Page A', uv: 200, pv: 2400, amt: 2400 }, { name: 'Page B', uv: 400, pv: 2400, amt: 2400 }, { name: 'Page C', uv: 300, pv: 2400, amt: 2400 }

const CompanyData = ({ comp, stockData, getDate }) => {
    console.log(stockData);
    const data = [];

    stockData.results.map(result => {
        const time = getDate(result.t);
        const closingPrice = result.c;
        data.push({ time, closingPrice: closingPrice });
    })


    return (
        <section>
            <h2><span>{comp.symbol}</span>: {comp.name}</h2>
            <div>

                {/* {stockData.results.map(result => <p key={result.t} >{getDate(result.t)}: {result.c} {comp.currency}</p>)} */}
                <p>Currency: {comp.currency}</p>
                <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="closingPrice" stroke="#8884d8" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChart>

            </div>
        </section>
    )
}

export default CompanyData