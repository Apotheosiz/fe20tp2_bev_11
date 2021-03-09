import { useState, useEffect } from 'react';
//import CompanySearch from '../CompanySearch';


const StockDataDashboard = () => {

    // const queryURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=NDKNCJQP3XCZ0Z28`;

    const [stockData, setStockData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [companyTicker, setCompanyTicker] = useState("");
    const [comp, setComp] = useState(null);
    // const [notFound, setNotFound] = useState(false);

    const onChange = event => {
        setSearchTerm(event.target.value)
    };

    const onSubmit = event => {
        // setNotFound(false);
        fetch(`https://financialmodelingprep.com/api/v3/search?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=b6c5cbff198727b26d87e2efe64a786d`)
            .then(response => response.json())
            .then(data => {
                // if (data === []) {
                // setNotFound(true);
                // } else {
                setResults(data);
                // }
            });
        event.preventDefault();
    }

    const getDate = (timestamp) => {
        let date = new Date(timestamp);
        return (<span>{date.toDateString()}</span>);
    }

    useEffect(() => {
        console.log('fromUseEffect');
        if (companyTicker) {
            fetch(`https://api.polygon.io/v2/aggs/ticker/${companyTicker}/range/1/month/2020-10-14/2021-01-01?unadjusted=true&sort=asc&limit=120&apiKey=skUrtuzSI4Dp7Zd6NOK8rEdIrxXHlq7Y`)
                .then(response => response.json())
                .then(data => setStockData(data))
        }
    }, [companyTicker])


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
            {results.map(result =>
                <div onClick={() => {
                    setCompanyTicker(result['symbol']);
                    setComp(result);
                    setResults([]);
                    setSearchTerm('')
                }}>
                    <span>{result['symbol']}</span>: <span>{result['name']}</span>
                </div>)}
            {/* {notFound ? <p>Company not found.</p> : null} */}

            {/* <CompanyList companies={results} setSelectedCompany={setSelectedCompany} /> */}

            {(comp && stockData) ?

                <div>
                    <h2><span>{comp.symbol}</span>: {comp.name}</h2>
                    {/* <span>Currency: {comp.currency}</span> */}
                    <p>
                        {stockData.results.map(result => <p>{getDate(result.t)}: {result.c} {comp.currency}</p>)}
                        {/* {stockData.map(result => <div><span>{new Date(result.t)}: </span><span>{result.c}</span></div>)} */}
                    </p>
                </div>

                : null}

        </div >
    )
}


export default StockDataDashboard;