import { useState, useEffect } from 'react';
import CompanyData from './CompanyData.js';


const StockDataDashboard = () => {
    //JSON.parse(localStorage.getItem('data'))
    console.log('rerendered stock data dashboard');
    // const [stockData, setStockData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(null);
    const [companyTicker, setCompanyTicker] = useState("");
    const [comp, setComp] = useState(null);

    const onChange = event => {
        setSearchTerm(event.target.value)
    };

    const onSubmit = event => {

        fetch(`https://financialmodelingprep.com/api/v3/search?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=b6c5cbff198727b26d87e2efe64a786d`)
            .then(response => response.json())
            .then(data => {
                setResults(data);
            });
        event.preventDefault();
    }

    const getDate = (timestamp) => {
        let date = new Date(timestamp);
        return (<span>{date.toLocaleDateString()}</span>);
    }

    // useEffect(() => {
    //     console.log('useEffect in StockDash');
    //     // if (companyTicker) {
    //     fetch(`https://api.polygon.io/v2/aggs/ticker/${companyTicker}/range/1/day/2020-10-01/2021-03-09?unadjusted=true&sort=asc&limit=120&apiKey=skUrtuzSI4Dp7Zd6NOK8rEdIrxXHlq7Y`)
    //         .then(response => response.json())
    //         .then(data => {
    //             setStockData(data);
    //             // localStorage.setItem('data', JSON.stringify(data))
    //         })
    //     // }
    // }, [companyTicker])


    return (
        <div>
            <h1>Dashboard</h1>

            <form onSubmit={onSubmit}>
                <input
                    name="searchCompany"
                    onChange={onChange}
                    type="text"
                    placeholder="Company name or ticker"
                    value={searchTerm}
                />
                <input type="submit" value="Search" />
            </form>
            {results ?
                (results.length > 0) ?
                    <div>
                        {results.map(result =>
                            <div onClick={() => {
                                setCompanyTicker(result['symbol']);
                                setComp(result);
                                setResults(null);
                                setSearchTerm('')
                            }} key={result['symbol']} >
                                <span>{result['symbol']}</span>: <span>{result['name']}</span>
                            </div>)}
                    </div>
                    : <p>Company not found.</p>
                : null
            }

            {(comp && companyTicker) ?
                <CompanyData comp={comp} companyTicker={companyTicker} getDate={getDate} />
                : null
            }

        </div >
    )
}


export default StockDataDashboard;