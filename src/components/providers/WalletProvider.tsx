"use client";

import {
  WalletProvider as AlgoWalletProvider,
  useInitializeProviders,
  PROVIDER_ID,
} from "@txnlab/use-wallet";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";
import MyAlgoConnect from "@randlabs/myalgo-connect";

const WalletProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
      { id: PROVIDER_ID.MYALGO, clientStatic: MyAlgoConnect },
    ],
    nodeConfig: {
      network: process.env.NEXT_PUBLIC_ALGOD_NETWORK!,
      nodeServer: process.env.NEXT_PUBLIC_ALGOD_SERVER!,
    },
  });

  return <AlgoWalletProvider value={providers}>{children}</AlgoWalletProvider>;
};

export default WalletProvider;
