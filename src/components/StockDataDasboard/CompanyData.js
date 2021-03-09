

const CompanyData = ({ comp, stockData, getDate }) => {

    return (
        <div>
            <h2><span>{comp.symbol}</span>: {comp.name}</h2>
            <p>
                {stockData.results.map(result => <p>{getDate(result.t)}: {result.c} {comp.currency}</p>)}
            </p>
        </div>
    )
}

export default CompanyData