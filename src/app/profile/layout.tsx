"use client";
import Navbar from "@/components/UI/Navbar";
import Sidebar from "@/components/UI/Sidebar";
import Connect from "@/components/wallet/Connect";
import { useWallet } from "@txnlab/use-wallet";
import ProfileProviders, { useProfileContext } from "./providers";
import useProfile from "@/hooks/useProfile";
import Button from "@/components/UI/Button";
import { useEffect } from "react";
import useInitProfile from "@/hooks/useInitProfile";

const ProfileLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { activeAccount, isReady } = useWallet();
  const { user, isLoading, error } = useProfileContext();
  const { mutate, isPending: isInitingProfile } = useInitProfile();
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-red-500">{error.message}</div>
      </div>
    );
  }

  if (!isReady || isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-[18px] h-[18px] border-2 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (!activeAccount) {
    return (
      <div className="h-full flex items-center justify-center">
        <Connect />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-full flex items-center justify-center">
        <Button variant="primary" onClick={() => mutate()} isLoading={isInitingProfile}>
          Create Profile
        </Button>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="grid lg:grid-cols-[345px_1fr] bg-[#F9F9F9] h-full pt-[102px]">
        <div className="hidden lg:flex">
          <Sidebar />
        </div>
        <div className="px-7 md:px-10 lg:px-[50px] py-[30px] h-full overflow-scroll">
          {children}
        </div>
      </div>
    </>
  );
};

const ProfileLayoutWithProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ProfileProviders>
      <ProfileLayout>{children}</ProfileLayout>
    </ProfileProviders>
  );
};

export default ProfileLayoutWithProvider;
