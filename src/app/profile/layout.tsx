"use client";
import Navbar from "@/components/UI/Navbar";
import Sidebar from "@/components/UI/Sidebar";
import Connect from "@/components/wallet/Connect";
import { useWallet } from "@txnlab/use-wallet";
import ProfileProviders, { useProfileContext } from "./providers";
import { useLayoutEffect, useState } from "react";
import clsx from "clsx";
import InitProfile from "@/components/profile/InitProfile";

const ProfileLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { activeAccount, isReady } = useWallet();
  const { user, isLoading, error } = useProfileContext();
  const [isSidebarShow, setIsSidebarShow] = useState(false);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setWidth(window.innerWidth);
      const onResize = () => {
        setWidth(window.innerWidth);
      };
      window.addEventListener("resize", onResize);

      return () => {
        window.removeEventListener("resize", onResize);
      };
    }
  }, []);

  const toggleSidebar = () => {
    setIsSidebarShow((prev) => !prev);
  };

  const hideSidebar = () => {
    setIsSidebarShow(false);
  };

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
        <InitProfile />
      </div>
    );
  }

  const isMobile = width < 1024;

  return (
    <div>
      <div
        className={clsx(
          "pointer-events-none transition-all fixed inset-0 bg-black/70 z-[1]",
          isMobile && isSidebarShow ? "opacity-100" : "opacity-0"
        )}
      ></div>
      <Navbar toggleSidebar={toggleSidebar} />
      <div
        className={clsx(
          "lg:grid lg:grid-cols-[345px_1fr] bg-[#F9F9F9] h-full pt-[86px] lg:pt-[102px]"
        )}
      >
        {isMobile ? (
          <div
            className={clsx(
              "transition-all flex bg-red-300 z-10 fixed top-[86px] bottom-0 max-w-[345px]",
              isSidebarShow ? "-translate-x-4" : "-translate-x-full"
            )}
          >
            <Sidebar hideSidebar={hideSidebar} />
          </div>
        ) : (
          <div className="h-[calc(100vh-86px)] lg:h-[calc(100vh-102px)]">
            <Sidebar />
          </div>
        )}
        <div className="px-7 md:px-10 lg:px-[50px] py-[30px] h-[calc(100vh-86px)] lg:h-[calc(100vh-102px)] overflow-scroll">
          {children}
        </div>
      </div>
    </div>
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
