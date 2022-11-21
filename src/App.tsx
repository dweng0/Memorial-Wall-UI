
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';

import Button, { DEPLOYED_NETWORK_ID } from './components/button/button';
import { MessageForm } from './components/messageform';
import { useMemoriesHook } from './hooks/use-memories-hook';
import { useVisibility } from './hooks/useVisibility';
import { useWalletConnection } from './hooks/walletconnect';
import { MemorialWallWrapper, StyledWrapper, Splash, FirstText, SecondText, ThirdText } from './styled';
import { MemorialWall } from './types/contracts/MemwallAbi';

export const StyledMemoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-direction: column;
  background-color: #38383880;
  width: calc(300px - 20px);
  height: calc(200px - 20px);
  transition: transform ease 1500ms;
  &:hover {
    transform: scale(1.1);
  }
  margin: 10px;
  & > p {
    font-style: italic;
  }
`

export const ShowMemory = (memory:  MemorialWall.MemoryMessageStructOutput, index: number ) => { 
  const { name, message, timestamp} = memory;
  const date = new Date(timestamp.toNumber() * 1000);
  const dateString = date.toLocaleDateString();
  const timeString = date.toLocaleTimeString();
  return (
    <StyledMemoryWrapper title={message} key={index}>
      <h3>{message}</h3>
      <p>{name} ~ {dateString} {timeString}</p>
    </StyledMemoryWrapper>
  )

}

function App() {
  const {ref}  = useVisibility();
  const { provider, wallet, connecting, connectedChain} = useWalletConnection()
  const {memories, setMemory, loading, setProvider, carvingOnToWall, getMemories} = useMemoriesHook()
  const [contextualText, setContextualText] = React.useState<string>('');
  const [canSubmit, setCanSubmit] = React.useState<boolean>(false);
  
  React.useEffect(() => {
    if(provider) { 
      console.log('setting provider')
      setProvider(provider)
      getMemories()
    }
   }, [provider, wallet, connecting, setProvider])

  React.useEffect(() => {
    console.log('did carving change?', carvingOnToWall)

    setCanSubmit(false)
    if(!provider) {
      setContextualText('Connect your wallet to leave a message')
    } else if (!wallet) {
      setContextualText('Connect your wallet to leave a message');
    } else if (connectedChain?.id !== DEPLOYED_NETWORK_ID) {
      setContextualText('Switch to the Goerli network to leave a message');
    } else if(carvingOnToWall === true) {
      setContextualText('Carving your message on the wall...');
      toast('Request sent', {autoClose: 1500})
      setCanSubmit(false)
    } 
    else if (memories.length === 0) {
      setCanSubmit(true)
      setContextualText('Leave a message');
    } else { 
      setCanSubmit(true)
      setContextualText('Leave another message');
    }
    
  }, [loading, connectedChain, memories, wallet, provider, carvingOnToWall])

  const submit = (name: string, message: string, donation: string) => { 
    console.log('submitting', name, message, donation);

    console.log('can submit?', canSubmit)
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
    setMemory(message, name, donation)
    
  }

  const showLoading = () => { 
    const text = contextualText || 'Loading...';
    if(true) {
      return <div><span className="loader loader-circles"></span> {text}</div>
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
        {loading ? showLoading() : <ThirdText>{contextualText}</ThirdText>}
        <MemorialWallWrapper ref={ref}>
        {memories.map(ShowMemory)}
        </MemorialWallWrapper>   
        </Splash>        
       
      </StyledWrapper>    
      {canSubmit && connectedChain?.id === DEPLOYED_NETWORK_ID && wallet && <MessageForm onSubmit={submit}/>}
      <Button/>
      <ToastContainer />
    </div>
  );
}


export default App;
