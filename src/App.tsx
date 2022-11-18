
import React from 'react';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button, { DEPLOYED_NETWORK_ID } from './components/button/button';
import { MessageForm } from './components/messageform';
import { useMemoriesHook } from './hooks/use-memories-hook';
import { useVisibility } from './hooks/useVisibility';
import { useWalletConnection } from './hooks/walletconnect';
import { MemorialWallWrapper, StyledWrapper, Splash, FirstText, SecondText, ThirdText } from './styled';

function App() {
  
  const [ref, left, top, right, bottom, intersecting]  = useVisibility();
  const { provider, wallet, connecting, connectedChain} = useWalletConnection()
  const {memories, setMemory, loading, carvingOnToWall, setProvider} = useMemoriesHook()
  const [contextualText, setContextualText] = React.useState<string>('');
  const [canSubmit, setCanSubmit] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    if(provider) { 
      console.log('setting provider')
      setProvider(provider)
    }
   }, [provider, wallet, connecting])

  React.useEffect(() => {
      setCanSubmit(false)
    if(!provider) {
      setContextualText('Connect your wallet to see the wall')
    } else if (!wallet) {
      setContextualText('Connect your wallet to leave a message');
    } else if (connectedChain?.id !== DEPLOYED_NETWORK_ID) {
      setContextualText('Switch to the Goerli network to leave a message');
    } else if (memories.length === 0) {
      setCanSubmit(true)
      setContextualText('Leave a message');
    } else { 
      setCanSubmit(true)
      setContextualText('Leave another message');
    }
    
  }, [loading, connectedChain, memories, wallet, provider])

  const submit = (name: string, message: string, donation: string) => { 
    if(!canSubmit) {
      toast(contextualText)
      return
    }

    /**
     * Error boundary
     */
    if(!name || !message || !donation) {
      toast('Please fill out all fields');
      return
    }
    setMemory(name, message, donation)
    
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
      {canSubmit && connectedChain?.id === DEPLOYED_NETWORK_ID && wallet && <MessageForm onSubmit={submit}/>}
      <Button/>
      <ToastContainer />
    </div>
  );
}


export default App;
