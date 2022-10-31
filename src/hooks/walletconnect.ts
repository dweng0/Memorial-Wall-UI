import React from "react";
import { ethers } from "ethers";
import {
  useAccountCenter,
  useConnectWallet,
  useNotifications,
  useSetChain,
  useWallets,
  useSetLocale,
} from "@web3-onboard/react";
import { initWeb3Onboard } from "../services";

export const useWalletConnection = () => {
  const [{ wallet }, connect, disconnect, updateBalances, setWalletModules] =
    useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const [notifications, customNotification, updateNotify] = useNotifications();
  const connectedWallets = useWallets();
  const updateAccountCenter = useAccountCenter();
  const updateLocale = useSetLocale();
  const [web3Onboard, setWeb3Onboard] = React.useState<any>();
  const [provider, setProvider] = React.useState<any>();

  React.useEffect(() => {
    setWeb3Onboard(initWeb3Onboard);
  }, []);

  React.useEffect(() => {
    console.log(notifications);
  }, [notifications]);

  React.useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    );
    window.localStorage.setItem(
      "connectedWallets",
      JSON.stringify(connectedWalletsLabelArray)
    );
  }, [connectedWallets, wallet]);

  React.useEffect(() => {
    if (!wallet?.provider) {
      setProvider(null);
    } else {
      setProvider(new ethers.providers.Web3Provider(wallet.provider, "any"));
    }
  }, [wallet]);

  React.useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem("connectedWallets") || ""
    );
    async function setWalletFromLocalStorage() {
      const walletConnected = await connect({
        autoSelect: previouslyConnectedWallets[0],
      });
      console.log("connected wallets: ", walletConnected);
    }

    if (previouslyConnectedWallets?.length) {
      setWalletFromLocalStorage();
    }
  }, [connect]);

  return {
    provider,
    wallet    
  }
};
