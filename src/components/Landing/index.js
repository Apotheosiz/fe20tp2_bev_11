import React from 'react';
import styled from 'styled-components'
import Logo from './Logo';
import PageContainer from '../PageContainer';
import { LandingPic } from '../svgImg/WelcomePic.js';
import Button from '../Button';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { SignInLink} from '../SignIn';

const Header = styled.div`
    padding-top: 80px;
`;

const Section = styled.div`
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
    `;

const Bubble = styled.div`
    max-width: 375px;
    margin: 15px;
    padding: 25px;

    background: #F8C3C3;
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

const MainContent = styled.div`
min-height: 90vh;
display:flex;
flex-direction: column;
justify-content: space-around;
`

const Landing = () => (
    <PageContainer> 
        <MainContent>
            <Header>
                <StyledLogo />
            </Header>
            <LandingPic width='80%' maxWidth='500px' />
            <div><Link to={ROUTES.SIGN_UP}><Button width='75%' maxWidth='400px' >Get started</Button></Link>
            <SignInLink /></div>
        </MainContent>
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
    </PageContainer>
);

export default Landing;
