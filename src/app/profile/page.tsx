"use client";

import Container from "@/components/UI/Container";
import Connect from "@/components/wallet/Connect";
import { useWallet } from "@txnlab/use-wallet";

const ProfilePage = () => {
  const { activeAccount } = useWallet();

  if (!activeAccount) {
    return <Connect />;
  }

  return <Container></Container>;
};

export default ProfilePage;
