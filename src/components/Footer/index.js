import styled from "styled-components";

const Wrapper = styled.div`
margin-top:15px;
width:100%;
padding: 20px;
text-align:center;
line-height: 16px;
background:#f8c3c3;
a{
    text-decoration:none;
    font-weight: 600;
    font-size: 22px;
}
`

const Footer = () => (
        <Wrapper>
            <a target="_blank" rel="noreferrer" href="https://github.com/Apotheosiz/fe20tp2_bev_11">Github</a>
        </Wrapper>
);

export default Footer;