
import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'

import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import fortmaticModule from '@web3-onboard/fortmatic'
import tallyModule from '@web3-onboard/tallyho'
// import * as dotenv from 'dotenv'
// dotenv.config()

const INFURA_ID = process.env.REACT_APP_INFURA

export const infuraRPC = `https://mainnet.infura.io/v3/${INFURA_ID}`

const dappId = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

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
    icon: 'https://memorialwall.io/favicon.ico',
    logo: 'https://memorialwall.io/favicon.ico',
    description: 'Connect to a wallet to get started',
    recommendedInjectedWallets: [
      { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
      { name: 'MetaMask', url: 'https://metamask.io' }
    ],
    agreement: {
      version: '1.0.0',
      termsUrl: 'https://www.blocknative.com/terms-conditions',
      privacyUrl: 'https://www.blocknative.com/privacy-policy'
    },
    gettingStartedGuide: 'https://blocknative.com',
    explore: 'https://blocknative.com'
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
      console.log({ transaction })
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
