

const CompanyData = ({ comp, stockData, getDate }) => {

    return (
        <section>
            <h2><span>{comp.symbol}</span>: {comp.name}</h2>
            <div>
                {stockData.results.map(result => <p key={result.t} >{getDate(result.t)}: {result.c} {comp.currency}</p>)}
            </div>
        </section>
    )
}

export default CompanyData