
import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'

import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import tallyModule from '@web3-onboard/tallyho'

const INFURA_ID = process.env.REACT_APP_INFURA

export const infuraRPC = `https://mainnet.infura.io/v3/${INFURA_ID}`

const injected = injectedModule()
const coinbase = coinbaseModule()
const walletConnect = walletConnectModule()

const tally = tallyModule()


export const initWeb3Onboard = init({
  wallets: [
    injected,
    tally,
    coinbase,
    walletConnect
  ],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum',
      rpcUrl: infuraRPC
    },   
    {
      id: '0x5',
      token: 'ETH',
      label: 'Goerli',
      rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`
    }   
  ],
  appMetadata: {
    name: 'Memorial Wall',
    icon: '/favicon.ico',
    logo: '/favicon.ico',
    description: 'Connect to a wallet to get started',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ],
  },
  accountCenter: {
    desktop: {
      position: 'topRight',
      enabled: true,
      minimal: true
    },
    mobile: {
        enabled: true
    }
  },
  notify: {
    transactionHandler: transaction => {
      if (transaction.eventCode === 'txPool') {
        return {
          // autoDismiss set to zero will persist the notification until the user excuses it
          autoDismiss: 0,
          // message: `Your transaction is pending, click <a href="https://rinkeby.etherscan.io/tx/${transaction.hash}" rel="noopener noreferrer" target="_blank">here</a> for more info.`,
          // or you could use onClick for when someone clicks on the notification itself
          onClick: () =>
            window.open(`https://rinkeby.etherscan.io/tx/${transaction.hash}`)
        }
      }
    }
  }
})
