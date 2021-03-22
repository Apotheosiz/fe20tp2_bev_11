import PreviewItem from "./PreviewItem";
import styled from 'styled-components';

const Panel = styled.div`
width: 95%;
margin: 30px auto;
display:flex;
flex-wrap:wrap;
justify-content:center;
`;

const PreviewPanel = ({ user }) => {

    return (
        <section>
            <Panel>
                {/* <ul>
                    <p onClick={() => { 
                        setCompanyTicker('AAPL');
                        console.log(companyTicker);
                        }}>some text here</p>
                </ul> */}
                
                {user && Object.keys(user.tickers).map(ticker => <PreviewItem comp={user.tickers[ticker]} ticker={ticker} />)}
            </Panel>
        </section>
    )
}


export default PreviewPanel;