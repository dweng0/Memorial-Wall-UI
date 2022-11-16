import { ConnectOptions, DisconnectOptions } from '@web3-onboard/core/dist/types';
import React from 'react'
import { useWalletConnection } from '../../hooks/walletconnect';
import { StyledButton, StyledButtonWrapper } from './styled';

const DEPLOYED_NETWORK_ID = '0x5';

/**
 * Types for the different button states
 */
type SetChainOptions = {
    chainId: string;
    chainNamespace?: string;
};

type SwitchNetworkProps = {
    chainId: string,
    settingChain: boolean,
    setChain: (options: SetChainOptions) => void
}

type ConnectDisconnectProps = { 
    connecting: boolean,
    wallet: any,
    disconnect: (disconnectOptions: DisconnectOptions) => void,
    connect: () => void
}

const SwitchNetwork: React.FC<SwitchNetworkProps> = ({chainId, settingChain, setChain}) => {
    return (
        <StyledButtonWrapper>
            <span>The memorial wall is on the Goerli network. Please switch</span>
            <StyledButton disabled={settingChain}onClick={() => setChain({chainId})}>Switch</StyledButton>
        </StyledButtonWrapper>
    )
}

const ConnectDisconnect: React.FC<ConnectDisconnectProps> = ({ connecting, connect, disconnect, wallet}) => {
    return (
        <StyledButtonWrapper>
            <span>{wallet ? 'disconnect' : 'connect'} wallet</span>
            <StyledButton disabled={connecting} onClick={() => (wallet ? disconnect(wallet) : connect())}>
                {connecting ? 'connecting' : wallet ? 'disconnect' : 'connect'}
            </StyledButton>
        </StyledButtonWrapper>

    )
}

export const Button: React.FC = () => {
    const { wallet, connecting, disconnect, connect, connectedChain, setChain, settingChain } = useWalletConnection()
    if (wallet && connectedChain?.id !== DEPLOYED_NETWORK_ID) {
        return <SwitchNetwork chainId={DEPLOYED_NETWORK_ID} settingChain={settingChain} setChain={setChain} />
    } else {
        return <ConnectDisconnect connecting={connecting} connect={connect} disconnect={disconnect} wallet={wallet} />
    }
   
}

export default Button