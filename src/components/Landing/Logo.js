import styled from "styled-components";

const StyledDiv = styled.div`
    font-family: 'Wallpoet', sans-serif;
    

    h1 {
        color: #44062B;
        font-size: 96px;
        margin: 0;
    }

    h2 {
        color: #CB6A5D;
        font-size: 20px;
        margin: 0;
        text-transform: uppercase;
    }

`

const Logo = ( {className} ) => {
  return (
  <StyledDiv className={className} >
    <h1>FINK</h1>
    <h2>Your financial dashboard!</h2>
  </StyledDiv>)
}

export default Logo;
