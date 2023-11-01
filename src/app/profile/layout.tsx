"use client";
import Navbar from "@/components/UI/Navbar";
import Sidebar from "@/components/UI/Sidebar";
import Connect from "@/components/wallet/Connect";
import { useWallet } from "@txnlab/use-wallet";
import ProfileProviders from "./providers";

const ProfileLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { activeAccount } = useWallet();
  if (!activeAccount) {
    return (
      <div className="h-full flex items-center justify-center">
        <Connect />
      </div>
    );
  }
  return (
    <ProfileProviders>
      <Navbar />
      <div className="grid grid-cols-[345px_1fr] bg-[#F9F9F9] h-full pt-[102px]">
        <Sidebar />
        <div className="px-[50px] py-[30px] h-full overflow-scroll">{children}</div>
      </div>
    </ProfileProviders>
  );
};

export default ProfileLayout;
