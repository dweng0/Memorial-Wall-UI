import useViewportSpy from 'beautiful-react-hooks/useViewportSpy';
import React from 'react';
import styled from 'styled-components';

import Button, { DEPLOYED_NETWORK_ID } from './components/button/button';
import { MessageForm } from './components/messageform';
import { useVisibility } from './hooks/useVisibility';
import { useWalletConnection } from './hooks/walletconnect';
import { MemorialWallWrapper, StyledWrapper, Splash, FirstText, SecondText, ThirdText } from './styled';
import { MemwallAbi, MemwallAbi__factory } from './types/contracts';
import { MemorialWall } from './types/contracts/MemwallAbi';
const DEPLOYED_CONTRACT_ADDRESS = '0x393b3442Df6E5AF57E0222343058A9Bff7F7dDcd';

function App() {
  
  const [ref, left, top, right, bottom, intersecting]  = useVisibility();
  const { provider, wallet, connecting, connectedChain} = useWalletConnection()
  const [memwall, setMemwall] = React.useState<MemwallAbi | null>(null);
  const [memories, setMemories] = React.useState<MemorialWall.MemoryMessageStructOutput[]>([]);
  const [contextualText, setContextualText] = React.useState<string>('');
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


  //setup contextual data

  React.useEffect(() => {
    if(!memwall) return;
    if(!wallet) {
      setContextualText('Connect your wallet to leave a message');
    } else if (connectedChain?.id !== DEPLOYED_NETWORK_ID) {
      setContextualText('Switch to the Goerli network to leave a message');
    } else if (memories.length === 0) {
      setContextualText('Leave a message');
    } else { 
      setContextualText('Leave another message');
    }
    
  }, [loading, connectedChain, errorMessage, memories, wallet])

  const submit = (name: string, message: string) => { 
    if(!memwall) return;
    memwall.addMemory(name, message, '')
    .then((tx) => {
      console.log(tx)
      setContextualText('Your memory has been added to the wall. It will appear on the wall once it has been mined.')
    })
    .catch((err) => {
      console.error(err)
      setContextualText('Failed to add memory to the wall')
    })
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
        <ThirdText>{contextualText}</ThirdText>
        </Splash>        
        <MemorialWallWrapper ref={ref}>
        {memories.map((memory) => {
          return <p>{memory.message}</p>
        })}
        </MemorialWallWrapper>
      </StyledWrapper>
      { !errorMessage && connectedChain?.id === DEPLOYED_NETWORK_ID && wallet && <MessageForm onSubmit={submit}/>}
      <Button/>
    </div>
  );
}


export default App;
