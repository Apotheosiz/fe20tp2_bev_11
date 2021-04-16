import styled from "styled-components";

const StyledDiv = styled.div`
    font-family: 'Wallpoet', sans-serif;
    

    h1 {
        color: var(--textColor);
        font-size: 96px;
        margin: 0;
    }

    h2 {
        font-size: 20px;
        margin: 0;
        text-transform: uppercase;
        color: inherit;
        font-family:'Saira Condensed',sans-serif;
        font-weight:400;
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
