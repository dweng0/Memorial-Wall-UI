import React, { useEffect } from "react";
import { init, useAccountCenter, useConnectWallet, useSetChain } from '@web3-onboard/react'
import { initWeb3Onboard } from "../services";
import { OnboardAPI } from "@web3-onboard/core";
import { ethers } from "ethers";
export const useWalletConnection = () => {
  
  const [onboarded, setOnboarded] = React.useState<OnboardAPI>()
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider>()

  const updateAccountCenter = useAccountCenter()
  const [
    {
      connectedChain, // the current chain the user's wallet is connected to
      settingChain // boolean indicating if the chain is in the process of being set
    },
    setChain // function to call to initiate user to switch chains in their wallet
  ] = useSetChain()

  useEffect(() => {
    setOnboarded(initWeb3Onboard)
    updateAccountCenter({position: 'topRight', enabled: true, minimal: true})
  }, [])

  useEffect(() => {
      let ethersProvider

      if (onboarded && wallet) {
        ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
        setProvider(ethersProvider)
      }
   }, [wallet])

  return { 
    connectedChain,
    settingChain,
    wallet,
    provider,
    connecting,
    connect,
    disconnect,
    setChain
  }
};
