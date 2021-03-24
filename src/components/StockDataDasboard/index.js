import { useState, useEffect } from 'react';
import CompanyData from './CompanyData.js';
import { withFirebase } from '../Firebase';
import PreviewPanel from './PreviewPanel';

const StockDataDashboard = ({ authUser, firebase }) => {
    console.log(authUser.ticker);
    console.log('rerendered stock data dashboard');
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(null);
    const [companyTicker, setCompanyTicker] = useState('AAPL');
    const [comp, setComp] = useState({
        currency: 'USD',
        exchangeShortName: 'NASDAQ',
        name: 'Apple Inc.',
        stockExchange: 'NasdaqGS',
        symbol:'AAPL',
    });
    const [user, setUser] = useState(null);

    const onChange = event => {
        setSearchTerm(event.target.value)
    };

    const addTicker = (ticker, comp) => {
            console.log(ticker, comp)
            firebase.user(authUser.uid).child('tickers').update({ [ticker]: comp })
    }

    const delTicker = ticker => {
            console.log(ticker)
            firebase.user(authUser.uid).child('tickers').update({ [ticker]: null })
    }

    const onSubmit = event => {
        fetch(`https://financialmodelingprep.com/api/v3/search?query=${searchTerm}&limit=20&exchange=NASDAQ&apikey=909a30a0b9971c3dfd378bba83efb9ac`)
            .then(response => response.json())
            .then(data => {
                setResults(data);
                console.log(data);
            });
        event.preventDefault();
    }

    useEffect(() => {
        firebase.user(authUser.uid).on('value', snapshot => {
            const dbUser = snapshot.val()
            setUser(dbUser);
        })
    }, []);

    // const contextDataObject = { user, setCompanyTicker, setComp, delTicker };
    // console.log(contextDataObject);

    return (
        <div>
            
            {user && <PreviewPanel user={user} setCompanyTicker={setCompanyTicker} setComp={setComp} delTicker={delTicker} />}

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
                            <div 
                                key={result['symbol']} 
                            >
                                <span
                                    onClick={() => {
                                        setCompanyTicker(result['symbol']);
                                        setComp(result);
                                        setResults(null);
                                        setSearchTerm('')
                                    }} 
                                >
                                    <span>{result['symbol']}</span>: <span>{result['name']}</span>
                                </span>
                                
                                {Object.keys(user.tickers).includes(result['symbol']) 
                                    ? <>
                                        {(Object.keys(user.tickers).length > 1) 
                                        && <button 
                                                onClick={() => delTicker(result['symbol'])}
                                            >
                                                REMOVE
                                            </button>}
                                    </> 
                                    : <>
                                        {(Object.keys(user.tickers).length < 5) 
                                        && <button 
                                                onClick={() => addTicker(result['symbol'], result)}
                                            >
                                                Add to favs
                                            </button>}
                                    </>}
                                    
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


export default withFirebase(StockDataDashboard);