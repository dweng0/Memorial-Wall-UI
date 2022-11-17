import useViewportSpy from 'beautiful-react-hooks/useViewportSpy';
import React from 'react';
import styled from 'styled-components';

import Button, { DEPLOYED_NETWORK_ID } from './components/button/button';
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
  const { provider, wallet, connecting, connectedChain} = useWalletConnection()
  const [memwall, setMemwall] = React.useState<MemwallAbi | null>(null);
  const [memories, setMemories] = React.useState<MemorialWall.MemoryMessageStructOutput[]>([]);
  
  const [loading, setLoading] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  
  React.useEffect(() => {
    if(!provider) return;
    setLoading(true);
    setMemwall(MemwallAbi__factory.connect(DEPLOYED_CONTRACT_ADDRESS, provider));
    debugger
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
      console.log('2')
    })
  }, [connecting, provider, wallet]);

  React.useEffect(() => {
    //check if top is visible
    if(intersecting && loading) {

    }
  }, [top, loading])

  const renderWall = () => { 
    
    if(memories.length > 0) {
      return <MemorialWallWrapper>
        {memories.map((memory) => {
          return <p>{memory.message}</p>
        })}
      </MemorialWallWrapper>
    }

    if(connectedChain?.id !== DEPLOYED_NETWORK_ID) {
      return <p>Please connect to the correct network</p>
    }

    if(loading) {
      return <p>Loading...</p>
    }

    if(errorMessage) {
      return <p>{errorMessage}</p>
    }

    if(memories.length === 0) {
      return <p>No memories yet</p>
    }
  }

  return (
    <div className="App">
      <StyledWrapper>
        <Splash>
        <div>
          <FirstText>Memory Wall.</FirstText>
          <SecondText>A place to leave messages</SecondText>
          <ThirdText>for loved ones</ThirdText>
        </div>
        </Splash>
        <MemorialWallWrapper ref={ref}>
          {renderWall()}
        </MemorialWallWrapper>
      </StyledWrapper>
      <Button/>
    </div>
  );
}

export default App;
