import PreviewItem from "./PreviewItem";
import styled from 'styled-components';

const Panel = styled.div`
width: 95%;
margin: 30px auto;
display:flex;
flex-wrap:wrap;
justify-content:center;
@media screen and (min-width:550px) {
    margin: 15px auto;
}
`;

const PreviewPanel = ({ user, setCompanyTicker, setComp, delTicker }) => {

    return (
        <section className="preview-panel">
            <Panel>                
                {user && user.tickers && Object.keys(user.tickers).map(ticker => <PreviewItem user={user} comp={user.tickers[ticker]} ticker={ticker} setCompanyTicker={setCompanyTicker} setComp={setComp} delTicker={delTicker} key={ticker} />)}
            </Panel>
        </section>
    )
}


export default PreviewPanel;