import { useState, useEffect, createContext } from "react";

export const TransactionContext = createContext();

let eth;

//* Verificar si esta metamask o alguna wallet vinculada
if (typeof window !== "undefined") {
  eth = window.ethereum;
}

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState();

  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  //* Function to Connect with MetaMastk
  const connectWallet = async (metamask = eth) => {
    try {
      if (!metamask) return alert("Please install Metamask");
      const accounts = await metamask.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);

      throw new Error("No Ethereum Object.");
    }
  };

  const checkIfWalletIsConnected = async (metamask = eth) => {
    try {
      if (!metamask) return "Please Install Metamask";
      const accounts = await metamask.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      }
    } catch (error) {
      console.log(error);
      throw new Error("No Ethereum Object");
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        currentAccount,
        connectWallet,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
