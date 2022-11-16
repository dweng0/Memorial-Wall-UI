import React from 'react';
import './App.css';
import { useWalletConnection } from './hooks/walletconnect';

function App() {
  const { provider, wallet, connecting, disconnect, connect } = useWalletConnection()
  return (
    <div className="App">
      <header className="App-header">
       <h1>Memorial Wall</h1>
      </header>
      <div>
        List of memories
      </div>
      <div>
      <button disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
        {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
      </button>
    </div>
    </div>
  );
}

export default App;
