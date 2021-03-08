import { useState, useEffect } from 'react';
//import CompanySearch from '../CompanySearch';

const URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=';

const API_KEY = '&interval=60min&apikey=NDKNCJQP3XCZ0Z28';

const StockDataDashboard = () => {

    // const queryURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=NDKNCJQP3XCZ0Z28`;

    const [stockData, setStockData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [companyTicker, setCompanyTicker] = useState("AAPL");
    const onChange = event => {
        setSearchTerm(event.target.value)
        // console.log(event.target);
        //     //     console.log(event.target.value);
        //     //     fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${event.target.value}&apikey=NDKNCJQP3XCZ0Z28`)
        //     //         .then(response => response.json())
        //     //         .then(data => {
        //     //             console.log(data);
        //     //         })

        //     //    setSearchTerm(event.target.value);
    };

    const onSubmit = event => {
        // https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=astrazeneca&apikey=NDKNCJQP3XCZ0Z28
        //     console.log(event.target);
        //     //     event.preventDefault();
        //     //     console.log('Almost there');
        // https://financialmodelingprep.com/api/v3/search?query=microsoft&limit=10&exchange=NASDAQ&apikey=b6c5cbff198727b26d87e2efe64a786d
        // https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=NDKNCJQP3XCZ0Z28
        fetch(`https://financialmodelingprep.com/api/v3/search?query=${searchTerm}&limit=10&exchange=NASDAQ&apikey=b6c5cbff198727b26d87e2efe64a786d`)
            .then(response => response.json())
            .then(data => setResults(data));
        event.preventDefault();
    }

    useEffect(() => {
        fetch(URL + companyTicker + API_KEY)
            .then(response => response.json())
            .then(data => setStockData(data))
    }, [companyTicker])


    return (
        <div>
            <h1>Our Dashboard</h1>
            { stockData ? <p>{Object.keys(stockData["Time Series (60min)"])[0]} : {stockData["Time Series (60min)"]["2021-03-03 20:00:00"]["4. close"]}</p> :
                null}

            {/* <CompanySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} /> */}
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
            {results.map(result => <div onClick={() => {
                setCompanyTicker(result['symbol'])
            }}> <span>{result['symbol']}</span>: <span>{result['name']}</span></div>)}
            {/* <CompanyList companies={results} setSelectedCompany={setSelectedCompany} /> */}
        </div >
    )
}


export default StockDataDashboard;