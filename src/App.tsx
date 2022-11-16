import React from 'react';

import Button from './components/button/button';
import { useWalletConnection } from './hooks/walletconnect';
import { MemwallAbi, MemwallAbi__factory } from './types/contracts';
const DEPLOYED_CONTRACT_ADDRESS = '0x393b3442Df6E5AF57E0222343058A9Bff7F7dDcd';

function App() {

  const { provider, wallet, connecting} = useWalletConnection()
  const [memwall, setMemwall] = React.useState<MemwallAbi | null>(null);

  React.useEffect(() => {
    if(!provider) return;
    setMemwall(MemwallAbi__factory.connect(DEPLOYED_CONTRACT_ADDRESS, provider));
  }, [connecting, provider, wallet]);

  return (
    <div className="App">
      <p>TODO stuff</p>
      <div>
      <Button/>
    </div>
    </div>
  );
}

export default App;
