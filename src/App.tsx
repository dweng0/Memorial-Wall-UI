import React from 'react';
import './App.css';
import { useWalletConnection } from './hooks/walletconnect';

function App() {
  const { provider, wallet } = useWalletConnection()
  return (
    <div className="App">
      <header className="App-header">
       <h1>Memorial Wall</h1>
      </header>
      <div>
        List of memories
      </div>
    </div>
  );
}

export default App;
