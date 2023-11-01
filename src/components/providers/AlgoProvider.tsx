"use client";
import { WalletProvider as AlgoWalletProvider } from "@txnlab/use-wallet";
import { createContext, useMemo } from "react";
import { Algodv2 } from "algosdk";

type TAlgoContext = {
  client: Algodv2;
};

const AlgoContext = createContext({} as TAlgoContext);

const AlgoProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const client = useMemo(() => {
    const algodToken = process.env.NEXT_PUBLIC_ALGOD_TOKEN;
    const algodServer = process.env.NEXT_PUBLIC_ALGOD_SERVER;
    const algodPort = process.env.NEXT_PUBLIC_ALGOD_PORT;
    if (typeof algodToken !== "string") throw new Error("Missing Algod Token");
    if (typeof algodServer !== "string") throw new Error("Missing Algod Server");
    return new Algodv2(algodToken, algodServer, algodPort);
  }, []);

  const contextValue = useMemo(() => ({ client }), [client]);

  return <AlgoContext.Provider value={contextValue}>{children}</AlgoContext.Provider>;
};

export default AlgoProvider;
