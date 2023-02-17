import { AppContextData, AppContext } from "@/store/AppContext";
import Head from "next/head";
import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import { Networks, networks } from "./SafeList/Networks";
import {Contract, ethers, JsonRpcProvider} from "ethers";
import {SafeFactory} from "@/abi/SafeFactory";

const Layout = ({ children }: { children: React.ReactNode }) => {
  
  const [visibleDisconnect, setVisibleDisconnect] = useState(false);
  const [visibleConnect, setVisibleConnect] = useState(false);
  const appCtx = useContext<AppContextData>(AppContext);
  const currentAccount = appCtx.appData.account;

  useEffect(() => {
    const { ethereum } = window;

    const network = networks[window.ethereum.networkVersion as keyof Networks];
    appCtx.setAppDataHandler({ network, account: sessionStorage.getItem("login") });
    
    if (ethereum != null) {
      ethereum.on("accountsChanged", handleConnectMetamaskClick);
      ethereum.on("chainChanged", handleDisconnectMetamaskClick);
      return () => {
        ethereum.removeListener(
          "accountsChanged",
          handleDisconnectMetamaskClick
        );
        ethereum.removeListener("chainChanged", handleDisconnectMetamaskClick);
      };
    }
  }, [visibleDisconnect, visibleConnect]);


  const handleConnectMetamaskClick = async () => {
    const { ethereum } = window;
    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      const chainId = await ethereum.request({
        method: "eth_chainId",
      });
      if (chainId !== process.env.targetChainId) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: process.env.targetChainId,
            },
          ],
        });
      }
      sessionStorage.setItem("login", accounts[0]);
      appCtx.setAppDataHandler({ account: sessionStorage.getItem("login") });
      setVisibleConnect(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDisconnectMetamaskClick = async () => {
    sessionStorage.removeItem("login");
    setVisibleDisconnect(false);
  };

  return (
    <>
      <Head>
        <title>Untitled Gnosis</title>
        <meta name="description" content="Untitled Gnosis" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header
        handleDisconnectMetamaskClick={handleDisconnectMetamaskClick}
        handleConnectMetamaskClick={handleConnectMetamaskClick}
        account={currentAccount}
        visibleConnect={visibleConnect}
        setVisibleDisconnect={setVisibleDisconnect}
        setVisibleConnect={setVisibleConnect}
        network={appCtx.appData.network}
      />
      {children}
    </>
  );
};

export default Layout;