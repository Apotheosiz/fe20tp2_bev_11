import React, { Component } from 'react';


const CompanySearch = () => {

    // const queryURL = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=NDKNCJQP3XCZ0Z28`;


    const onChange = event => {
        console.log('some change');
    };

    const onSubmit = event => {
        event.preventDefault();
        console.log('Almost there');
    }

    return (
        <div>
            <form onSubmit={() => onSubmit()}>
                <input
                    name="searchCompany"
                    onChange={() => onChange()}
                    type="text"
                    placeholder="Company name or ticker"
                />
                <input type="submit">Search</input>
            </form>
        </div>
    )
}

export default CompanySearch