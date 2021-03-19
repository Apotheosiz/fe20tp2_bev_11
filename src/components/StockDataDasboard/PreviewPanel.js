import PreviewItem from "./PreviewItem";


const PreviewPanel = ({ user }) => {

    return (
        <section>
            <div>
                {/* <ul>
                    <p onClick={() => { 
                        setCompanyTicker('AAPL');
                        console.log(companyTicker);
                        }}>some text here</p>
                </ul> */}
                
                {user && Object.keys(user.tickers).map(ticker => <PreviewItem comp={user.tickers[ticker]} ticker={ticker} />)}
            </div>
        </section>
    )
}


export default PreviewPanel;