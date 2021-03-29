import { useState, useEffect } from 'react';
import CompanyData from './CompanyData.js';
import { withFirebase } from '../Firebase';
import PreviewPanel from './PreviewPanel';
import styled from 'styled-components';

const StyledButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    background: transparent;
    padding: 10px;
    cursor: pointer;
    border-radius: 50%;
    width: 35px;
    height: 35px;
    margin: 5px;
    &:hover {
        background: #efefef;
    }
`

const FormWrapper = styled.div`
    width: 95%;
    max-width: 600px;
    margin: 20px auto;
    border-radius: 15px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
    padding: 0 15px;

    form {
        display: flex;
        justify-content: space-between;
        padding: 15px 0;
        
        input {
            width: 90%;
            border: none;
            border-radius: 15px;
            
            outline: none;
            font-size: 16px;
        }
        svg{
            width: 15px;
            padding-right: 10px;
        }
     
    }
   
    &:hover,
    &:active,
    &:focus{
        box-shadow: rgba(100, 100, 111, 0.4) 0px 7px 20px 0px;
    }
    
`
const ResultDiv = styled.div`
    padding: 15px 0;
    border-top: 1px solid #efefef;
    display: flex;
    justify-content: space-between;
    
    
    .ticker{
        font-weight: 600;
        color: #5c6065;
    }

 

    

`



const StockDataDashboard = ({ authUser, firebase, comp, setComp }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState(null);
    const [companyTicker, setCompanyTicker] = useState('AAPL');
    const [user, setUser] = useState(null);

    const onChange = event => {
        setSearchTerm(event.target.value);
        fetch(`https://financialmodelingprep.com/api/v3/search?query=${searchTerm}&limit=20&exchange=NASDAQ&apikey=909a30a0b9971c3dfd378bba83efb9ac`)
            .then(response => response.json())
            .then(data => {
                setResults(data);
            });
    };

    const addTicker = (ticker, comp) => {
            firebase.user(authUser.uid).child('tickers').update({ [ticker]: comp });
            
          
    }

    const delTicker = ticker => {
            firebase.user(authUser.uid).child('tickers').update({ [ticker]: null });
            
            
    }

    const onSubmit = event => {
        
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
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <title>Search</title>
                        <path fill="#000" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                    </svg>
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
                                    <span className="ticker">{result['symbol']}</span>: <span>{result['name']}</span>
                                </span>
                                
                                {Object.keys(user.tickers).includes(result['symbol']) 
                                    ? <>
                                        {(Object.keys(user.tickers).length > 1) 
                                        && <StyledButton 
                                                onClick={() => delTicker(result['symbol'])}
                                            >
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                    <title>Remove</title>
                                                    <path fill="#f3c611" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                                                </svg>
                                            </StyledButton>}
                                    </> 
                                    : <>
                                        {(Object.keys(user.tickers).length < 5) 
                                        && <StyledButton 
                                                onClick={() => addTicker(result['symbol'], result)}
                                            >
                                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="star" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                                                    <title>Add to Favorites</title>
                                                    <path fill="currentColor" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
                                                </svg>
                                            </StyledButton>}
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