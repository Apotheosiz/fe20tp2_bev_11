import { useState, useEffect } from 'react';
import CompanyData from './CompanyData.js';
import { withFirebase } from '../Firebase';
import PreviewPanel from './PreviewPanel';
import styled from 'styled-components';

const FormWrapper = styled.div`
    width: 95%;
    max-width: 900px;
    margin: 20px auto;
    border-radius: 15px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;

    form {
        display: flex;
        justify-content: space-between;
        
        input {
            width: 90%;
            border: none;
            border-radius: 15px;
            padding-left: 10px;
            outline: none;
        }

        button {
            border: none;
            background: transparent;
            padding: 10px;
            cursor: pointer;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            margin: 5px;
            
            svg {
                fill: #000;
           
            }
        }

        button:hover {
            background: #efefef;
        }
    }
   
    &:hover,
    &:active,
    &:focus{
        box-shadow: rgba(100, 100, 111, 0.4) 0px 7px 20px 0px;
    }
    
`
const ResultDiv = styled.div`
    padding: 8px 10px 8px 10px;
    border-top: 1px solid #efefef;


`



const StockDataDashboard = ({ authUser, firebase, comp, setComp }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(null);
    const [companyTicker, setCompanyTicker] = useState('AAPL');
    const [user, setUser] = useState(null);

    const onChange = event => {
        setSearchTerm(event.target.value)
    };

    const addTicker = (ticker, comp) => {
            firebase.user(authUser.uid).child('tickers').update({ [ticker]: comp });
            setResults(null);
            setSearchTerm("");
    }

    const delTicker = ticker => {
            firebase.user(authUser.uid).child('tickers').update({ [ticker]: null });
            setResults(null);
            setSearchTerm("");
    }

    const onSubmit = event => {
        fetch(`https://financialmodelingprep.com/api/v3/search?query=${searchTerm}&limit=20&exchange=NASDAQ&apikey=909a30a0b9971c3dfd378bba83efb9ac`)
            .then(response => response.json())
            .then(data => {
                setResults(data);
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
        <FormWrapper>
            <div>            
                <form onSubmit={onSubmit}>
                    <input
                        name="searchCompany"
                        onChange={onChange}
                        type="text"
                        placeholder="Company name or ticker"
                        value={searchTerm}
                    />
                    <button type="submit" >
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <title>Search</title>
                            <path fill="#000" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg>
                    </button>
                </form>
            </div>

            {results ?
                (results.length > 0) ?
                
                   <div>
                        {results.map(result =>
                            <ResultDiv 
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
                                    
                            </ResultDiv>)}
                    </div>
                    : <ResultDiv><span>Company not found.</span></ResultDiv>
                : null
            }
            </FormWrapper>
            
            {user && <PreviewPanel user={user} setCompanyTicker={setCompanyTicker} setComp={setComp} delTicker={delTicker} />}

            {(comp && companyTicker) ?
                <CompanyData comp={comp} companyTicker={companyTicker} />
                : null
            }
            
        </div>
    )
}


export default withFirebase(StockDataDashboard);