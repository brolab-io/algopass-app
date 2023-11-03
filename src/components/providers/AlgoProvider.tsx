"use client";
import { createContext, useContext, useMemo } from "react";
<<<<<<< HEAD
<<<<<<< HEAD
import algosdk, { Algodv2 } from "algosdk";
=======
import { Algodv2 } from "algosdk";
>>>>>>> a6e4473 (call contract)
=======
import { Algodv2 } from "algosdk";
>>>>>>> efdf7f0 (call contract)
import { AppDetails } from "@algorandfoundation/algokit-utils/types/app-client";
import { TransactionSignerAccount } from "@algorandfoundation/algokit-utils/types/account";
import { getAlgoIndexerClient } from "@algorandfoundation/algokit-utils";
import { useWallet } from "@txnlab/use-wallet";
import { AlgopassClient } from "../../contract/AlgopassClient";

type TAlgoContext = {
  client: Algodv2;
  algopassClient: AlgopassClient;
  appID: number;
  appAddress: string;
};

const AlgoContext = createContext({} as TAlgoContext);

export const useAlgoPassContext = () => {
  return useContext(AlgoContext);
};

const AlgoProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { signer, activeAddress } = useWallet();
  const appID = Number(process.env.NEXT_PUBLIC_ALGOD_APP_ID);
<<<<<<< HEAD
<<<<<<< HEAD
  const appAddress = useMemo(() => {
    return algosdk.getApplicationAddress(appID);
  }, [appID]);
=======
  const appAddress = process.env.NEXT_PUBLIC_ALGOD_APP_ADDRESS!;
>>>>>>> a6e4473 (call contract)
=======
  const appAddress = process.env.NEXT_PUBLIC_ALGOD_APP_ADDRESS!;
>>>>>>> efdf7f0 (call contract)

  const client = useMemo(() => {
    const algodToken = process.env.NEXT_PUBLIC_ALGOD_TOKEN;
    const algodServer = process.env.NEXT_PUBLIC_ALGOD_SERVER;
    const algodPort = process.env.NEXT_PUBLIC_ALGOD_PORT;
    if (typeof algodToken !== "string") throw new Error("Missing Algod Token");
    if (typeof algodServer !== "string") throw new Error("Missing Algod Server");
    return new Algodv2(algodToken, algodServer, algodPort);
  }, []);

  const appDetails = useMemo<AppDetails>(() => {
    const indexerToken = process.env.NEXT_PUBLIC_INDEXER_TOKEN;
    const indexerServer = process.env.NEXT_PUBLIC_INDEXER_SERVER;
    const indexerPort = process.env.NEXT_PUBLIC_INDEXER_PORT;

    if (typeof indexerToken !== "string") throw new Error("Missing Algod Token");
    if (typeof indexerServer !== "string") throw new Error("Missing Algod Server");
    const indexer = getAlgoIndexerClient({
      server: indexerServer,
      port: indexerPort,
      token: indexerToken,
    });
    return {
      resolveBy: "id",
      id: appID,
      sender: { signer, addr: activeAddress } as TransactionSignerAccount,
      findExistingUsing: indexer,
    };
  }, [signer, activeAddress, appID]);

  const algopassClient = useMemo(() => {
    return new AlgopassClient(appDetails, client);
  }, [appDetails, client]);

  const contextValue = useMemo(
    () => ({ client, algopassClient, appID, appAddress }),
    [client, algopassClient, appID, appAddress]
  );

  return <AlgoContext.Provider value={contextValue}>{children}</AlgoContext.Provider>;
};

export default AlgoProvider;
