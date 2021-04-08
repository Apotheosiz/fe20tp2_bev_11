import { useState, useEffect, useRef } from 'react';
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
    svg {
        fill: #5c6065;
    }
    &:hover {
        background: #efefef;
    }

`
const StockDashboard = styled.div`
@media screen and (min-width:550px) {
    display: flex;
    flex-direction: column;
    .preview-panel {
        order: -1;
    }
} 
`

const FormWrapper = styled.div`
    width: 95%;
    max-width: 600px;
    margin: 20px auto;
    border-radius: 15px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 20px 0px;
    padding: 0 15px 0 26px;

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

        svg {
            width: 15px;
            margin-right: 5px;
        }

        div {
            display: flex;
            align-items: center;
            justify-content: center;
            border: none;
            background: transparent;
            cursor: pointer;
            border-radius: 50%;
            width: 35px;
            height: 35px;
            margin: 5px;
            margin-right: 5px;
            &:hover {
                background: #efefef;
            }
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
    align-items: center;
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
        fetch(`https://financialmodelingprep.com/api/v3/search?query=${searchTerm}&limit=7&exchange=NASDAQ&apikey=909a30a0b9971c3dfd378bba83efb9ac`)
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

    const searchList = useRef(null);

    useEffect(() => {
        firebase.user(authUser.uid).on('value', snapshot => {
            const dbUser = snapshot.val()
            setUser(dbUser);
        })

        //window.addEventListener('mouseup', closeSearchList);
        //return () => window.removeEventListener('mouseup', closeSearchList);
    }, []);

    const closeSearchList = () => {
        /*if (!searchList.current.contains(event.target)) {
            setResults(null);
            setSearchTerm('');
        }*/
        setResults(null);
        setSearchTerm('');
    }

    // const contextDataObject = { user, setCompanyTicker, setComp, delTicker };
    // console.log(contextDataObject);

    return (
        <StockDashboard>
            <FormWrapper ref={searchList}>
                <div>            
                    <form onSubmit={onSubmit}>
                        
                        <svg version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966">
                            <title>Search</title>
                            <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23
                                s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92
                                c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17
                                s-17-7.626-17-17S14.61,6,23.984,6z"/>
                        </svg>
                        <input
                            name="searchCompany"
                            onChange={onChange}
                            type="text"
                            placeholder="Company name or ticker"
                            value={searchTerm}
                        />
                        {results ? 
                        <div onClick={closeSearchList}>
                            <svg viewBox="0 0 329.26933 329" width="329pt" xmlns="http://www.w3.org/2000/svg">
                                <title>Close</title>
                                <path d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0"/>
                            </svg>
                        </div>
                        : null}
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
                                                        <path fill="current color" d="M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"></path>
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
            
        </StockDashboard>
    )
}


export default withFirebase(StockDataDashboard);