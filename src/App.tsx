import useViewportSpy from 'beautiful-react-hooks/useViewportSpy';
import React from 'react';
import styled from 'styled-components';

import Button from './components/button/button';
import { useVisibility } from './hooks/useVisibility';
import { useWalletConnection } from './hooks/walletconnect';
import { MemwallAbi, MemwallAbi__factory } from './types/contracts';
import { MemorialWall } from './types/contracts/MemwallAbi';
const DEPLOYED_CONTRACT_ADDRESS = '0x393b3442Df6E5AF57E0222343058A9Bff7F7dDcd';

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const FirstText = styled.p`
  animation: text-focus-in 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) 0.5s both;
`


export const SecondText = styled.p`
  animation: text-focus-in 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) 0.7s both;
  s both;
`


export const ThirdText = styled.p`
  animation: text-focus-in 0.3s cubic-bezier(0.550, 0.085, 0.680, 0.530) 0.8s backwards;
`

export const Splash = styled.div`
width: 100vw;
height: 100vh;
display: flex;
overflow: hidden;
text-align: center;
justify-content: center;
flex-direction: column;
`

export const MemorialWallWrapper = styled.div`
margin-top: 20px;
height: 200px;
`

function App() {
  const [ref, left, top, right, bottom, intersecting]  = useVisibility();
  const { provider, wallet, connecting} = useWalletConnection()
  const [memwall, setMemwall] = React.useState<MemwallAbi | null>(null);
  const [memories, setMemories] = React.useState<MemorialWall.MemoryMessageStructOutput[]>([]);
  
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  
  React.useEffect(() => {
    if(!provider) return;
    setLoading(true);
    setMemwall(MemwallAbi__factory.connect(DEPLOYED_CONTRACT_ADDRESS, provider));

    memwall?.getMemories().then((memories) => {
      setMemories(memories);
      console.log('got memories')
    })
    .catch((err) => {
      setErrorMessage('Failed to get Memories');
      console.error(err)
    })
    .finally(() => {
      setLoading(false);
    })
  }, [connecting, provider, wallet]);

  React.useEffect(() => {
    //check if top is visible
    if(intersecting && loading) {

    }
  }, [top, loading])

  return (
    <div className="App">
      <StyledWrapper>
        <Splash>
        <div>
          <span>memory wall visible? {top}</span>
          <FirstText>Memory Wall.</FirstText>
          <SecondText>A place to leave messages</SecondText>
          <ThirdText>for loved ones</ThirdText>
        </div>
        </Splash>
        <MemorialWallWrapper ref={ref}>

        </MemorialWallWrapper>
      </StyledWrapper>
      <Button/>
    </div>
  );
}

export default App;
