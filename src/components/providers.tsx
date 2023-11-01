"use client";

import { WalletProvider, useInitializeProviders, PROVIDER_ID } from "@txnlab/use-wallet";
import { DeflyWalletConnect } from "@blockshake/defly-connect";
import { PeraWalletConnect } from "@perawallet/connect";
import { DaffiWalletConnect } from "@daffiwallet/connect";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  const providers = useInitializeProviders({
    providers: [
      { id: PROVIDER_ID.DEFLY, clientStatic: DeflyWalletConnect },
      { id: PROVIDER_ID.PERA, clientStatic: PeraWalletConnect },
      { id: PROVIDER_ID.DAFFI, clientStatic: DaffiWalletConnect },
      { id: PROVIDER_ID.EXODUS },
    ],
  });

  return <WalletProvider value={providers}>{children}</WalletProvider>;
};

export default Providers;
