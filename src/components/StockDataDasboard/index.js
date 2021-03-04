import { useState, useEffect } from 'react';

const URL = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=';
const companyTicker = "AAPL";
const API_KEY = '&interval=60min&apikey=NDKNCJQP3XCZ0Z28';

const StockDataDashboard = () => {

    // const queryURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=NDKNCJQP3XCZ0Z28`;

    const [stockData, setStockData] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const onChange = event => {
        setSearchTerm(event.target.value);
    };

    const onSubmit = event => {
        event.preventDefault();
        console.log('Almost there');
    }

    useEffect(() => {
        fetch(URL + companyTicker + API_KEY)
            .then(response => response.json())
            .then(data => setStockData(data))
    }, [])


    return (
        <div>
            <h1>Our Dashboard</h1>
            { stockData ? <p>{Object.keys(stockData["Time Series (60min)"])[0]} : {stockData["Time Series (60min)"]["2021-03-03 20:00:00"]["4. close"]}</p> :
                null}
            <form onSubmit={() => onSubmit()}>
                <input
                    name="searchCompany"
                    value={searchTerm}
                    onChange={() => onChange()}
                    type="text"
                    placeholder="Company name or ticker"
                />
                <button type="submit">Search</button>
            </form>
        </div>
    )
}

export default StockDataDashboard;