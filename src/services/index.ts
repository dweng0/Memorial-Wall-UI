
import { init } from '@web3-onboard/react'
import injectedModule from '@web3-onboard/injected-wallets'
import trezorModule from '@web3-onboard/trezor'
import ledgerModule from '@web3-onboard/ledger'
import walletConnectModule from '@web3-onboard/walletconnect'
import coinbaseModule from '@web3-onboard/coinbase'
import portisModule from '@web3-onboard/portis'
import magicModule from '@web3-onboard/magic'
import fortmaticModule from '@web3-onboard/fortmatic'
import torusModule from '@web3-onboard/torus'
import keepkeyModule from '@web3-onboard/keepkey'
import gnosisModule from '@web3-onboard/gnosis'
import web3authModule from '@web3-onboard/web3auth'
import sequenceModule from '@web3-onboard/sequence'
import tallyModule from '@web3-onboard/tallyho'
import gas from '@web3-onboard/gas'
import * as dotenv from 'dotenv'
dotenv.config()

const INFURA_ID = process.env.INFURA_ID

export const infuraRPC = `https://mainnet.infura.io/v3/${INFURA_ID}`

const dappId = '1730eff0-9d50-4382-a3fe-89f0d34a2070'

const injected = injectedModule()
const coinbase = coinbaseModule()
const walletConnect = walletConnectModule()

const portis = portisModule({
  apiKey: 'b2b7586f-2b1e-4c30-a7fb-c2d1533b153b'
})

const fortmatic = fortmaticModule({
  apiKey: 'pk_test_886ADCAB855632AA'
})

const torus = torusModule()
const ledger = ledgerModule()
const keepkey = keepkeyModule()
const gnosis = gnosisModule()
const sequence = sequenceModule()
const tally = tallyModule()


export const initWeb3Onboard = init({
  wallets: [
    injected,
    tally,
    ledger,
    coinbase,
    walletConnect,
    gnosis,
    fortmatic,
    keepkey,
    portis,
    torus,
    sequence
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
      minimal: false
    },
    mobile: {
        enabled: false
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

// subscribe to a single chain for estimates using the default poll rate of 5 secs
// API key is optional and if provided allows for faster poll rates
export const ethMainnetGasBlockPrices = gas.stream({
  chains: ['0x1'],
  // apiKey: dappId,
  endpoint: 'blockPrices'
})