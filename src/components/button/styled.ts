import styled from "styled-components";

export const StyledButtonWrapper = styled.div`
    position: fixed;
    left: 10px;
    top: 10px;
    transition: 0.5s;
    background: #f9f5f5;
    padding: 16px;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    width: 270px;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
    justify-content: center;
    font-family: 'Sono', sans-serif;
    font-size: 16px;
    transition: all 0.5s ease;
    color: #777777
`

export const StyledButton = styled.button`
transition: all 0.5s ease;
box-shadow:inset 0px 1px 0px 0px #ffffff;
background:linear-gradient(to bottom, #ededed 5%, #dfdfdf 100%);
background-color:#ededed;
border-radius:6px;
border:1px solid #dcdcdc;
display:inline-block;
cursor:pointer;
color:#777777;
font-family:Arial;
font-size:15px;
font-weight:bold;
padding:6px 24px;
text-decoration:none;
text-shadow:0px 1px 0px #ffffff;
&:hover {
    background:linear-gradient(to bottom, #dfdfdf 5%, #ededed 100%);
	background-color:#dfdfdf;
}
&:active {
    position:relative;
	top:1px;
}     
`