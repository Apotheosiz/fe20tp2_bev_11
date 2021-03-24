import PreviewItem from "./PreviewItem";
import styled from 'styled-components';

const Panel = styled.div`
width: 95%;
margin: 30px auto;
display:flex;
flex-wrap:wrap;
justify-content:center;
`;

const PreviewPanel = ({ user, setCompanyTicker, setComp, delTicker }) => {

    return (
        <section>
            <Panel>                
                {user && user.tickers && Object.keys(user.tickers).map(ticker => <PreviewItem user={user} comp={user.tickers[ticker]} ticker={ticker} setCompanyTicker={setCompanyTicker} setComp={setComp} delTicker={delTicker} />)}
            </Panel>
        </section>
    )
}


export default PreviewPanel;