import React from 'react';
import styled from 'styled-components'
import Logo from './Logo';
import PageContainer from '../PageContainer';
import { LandingPic } from '../svgImg/WelcomePic.js';
import Button from '../Button';
import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';
import { SignInLink} from '../SignIn';
import { ArrowDown } from '../svgImg/WelcomePic';

const Header = styled.div`
    padding-top: 80px;
`;

const Section = styled.div`
    padding-top: 10px;
    padding-bottom: 20px;
`;

const Row = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
    @media (min-width: 700px) {
        flex-direction: row;
        justify-content: center;
    }
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
    @media (min-width: 700px) {
        min-height:330px;
        display: flex;
        align-items: center;
    }
`;

const Title = styled.h1`
    max-width: 375px;
    margin: 0 auto;
    text-align: center;
    color: #44062B;
    font-family: 'Saira Condensed', sans-serif;
    font-size: 42px;
    @media (min-width: 700px) {
        max-width:none;
    }
`;

const MainContent = styled.div`
min-height: 75vh;
max-height: 75vh;
display:flex;
flex-direction: column;
justify-content: space-around;
@media (min-width: 700px) {
  min-height: 75vh;
}
`

const ArrowButton = styled.button`
  background: none;
  border: none;
  width: 150px;
  svg {
    cursor: pointer;
  }
`

const Landing = () => (
    <PageContainer> 
        <MainContent>
            <Header>
                <Logo />
            </Header>
            <LandingPic width='80%' maxWidth='500px' />
            <div><Link to={ROUTES.SIGN_UP}><Button width='75%' maxWidth='400px' >Get started</Button></Link>
            <SignInLink /></div>
        </MainContent>
        <ArrowButton>
          <ArrowDown />
        </ArrowButton>
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
