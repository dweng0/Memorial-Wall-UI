import React, { useEffect } from "react";
import { init, useConnectWallet } from '@web3-onboard/react'
import { initWeb3Onboard } from "../services";
import { OnboardAPI } from "@web3-onboard/core";
import { ethers } from "ethers";

export const useWalletConnection = () => {

  const [onboarded, setOnboarded] = React.useState<OnboardAPI>()
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [provider, setProvider] = React.useState<ethers.providers.Web3Provider>()

  useEffect(() => {
    setOnboarded(initWeb3Onboard)
  }, [])

  useEffect(() => {
      let ethersProvider

      if (onboarded && wallet) {
        ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
        setProvider(ethersProvider)
      }
   }, [wallet])

  return { 
    wallet,
    provider,
    connecting,
    connect,
    disconnect
  }
};
