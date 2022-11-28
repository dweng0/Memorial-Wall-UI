import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FirstText = styled.p`
  font-size: 2.5rem;
  font-weight: 700;
  animation: text-focus-in 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53) 0.5s both;
`;

export const SecondText = styled.p`
animation: text-focus-in 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) 0.7s both;
s both;
`;

export const ThirdText = styled.p`
  animation: text-focus-in 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53) 0.8s
    backwards;
`;

export const Splash = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`;

export const MemorialWallWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 20px;  
`;

export const FormWrapper = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  top: 114px;
  left: 10px;
`;

export const StyledInput = styled.input`
  padding: 8px;
  font-size: 21px;
  border-width: 1px;
  border-color: #cccccc;
  background-color: #ffffff;
  color: #000000;
  border-style: solid;
  border-radius: 5px;
  width: calc(100% - 16px);
  &:focus {
    outline: none;
  }
  width: 100%;
  margin: auto;
`;

export const StyledTextArea = styled.textarea`
padding: 8px;
font-size: 21px;
border-width: 1px;
border-color: #cccccc;
background-color: #ffffff;
color: #000000;
border-style: solid;
border-radius: 5px;
height: 71px;
width: 100%;
&:focus {
  outline: none;
}
margin: auto;
`

export const SubmitWrapper = styled.div`
    width: 100%;
`