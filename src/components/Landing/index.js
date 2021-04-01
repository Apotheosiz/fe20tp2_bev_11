import React from 'react';
import styled from 'styled-components'
import Logo from './Logo';
import HeaderImg from '../../img/header.png';

const Header = styled.div`
    background-image: url(${HeaderImg});
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top, center;
    height: 80vh;
    max-width: 100vw;
`;

const Section = styled.div`
    background: #F2ADA4;
    padding-top: 10px;
    padding-bottom: 20px;
`;

const Row = styled.div`
    display: flex;
    justify-content: center;

    @media (max-width: 980px) {
        flex-direction: column;
    }
`;

const StyledLogo = styled(Logo)`
    position: absolute;
    bottom: 500px;
    margin-left: 55px;
    `;

const Bubble = styled.div`
    max-width: 375px;
    margin: 15px;
    padding: 25px;

    background: #DBD1D0;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    font-family: 'Saira Condensed', sans-serif;
    font-size: 22px;
    color: #674258;
`;

const Title = styled.h1`
    text-align: center;
    color: #44062B;
    font-family: 'Saira Condensed', sans-serif;
    font-size: 42px;
`;

const Landing = () => (
    <React.Fragment>
        <div>
            <Header>
                <StyledLogo />
                    {/* <h2>FINK</h2>
                    <h5>YOUR FINANCIAL DASHBOARD</h5>
                </HeaderByLine> */}
            </Header>
        </div>
        <Section>
            <Title>WHY MARKET LEADERS ARE CHOOSING FINK</Title>
            <Row>
                <Bubble>
                    <p>Scaling that goes up to the billions. More than having the broadest, most reliable connections across Europe, the Tink platform has the scale to suit big international customers. We handle over 1bn monthly API calls with 99.9%+ uptime</p>
                </Bubble>
                <Bubble>
                    <p>One platform, endless possibilities. We offer a range of products that can help businesses achieve a series of different goals. From streamlining onboarding, attracting new users with award-winning apps – to processing millions in payments.</p>
                </Bubble>
            </Row>
        </Section>
    </React.Fragment>
);

export default Landing;
