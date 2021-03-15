import { useState } from 'react';
import CompanyData from './CompanyData.js';


const StockDataDashboard = () => {
    console.log('rerendered stock data dashboard');
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
                <CompanyData comp={comp} companyTicker={companyTicker} />
                : null
            }

        </div >
    )
}


export default StockDataDashboard;