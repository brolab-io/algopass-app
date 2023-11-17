"use client";
import Navbar from "@/components/UI/Navbar";
import Sidebar from "@/components/UI/Sidebar";
import Connect from "@/components/wallet/Connect";
import { useWallet } from "@txnlab/use-wallet";
import ProfileProviders, { useProfileContext } from "./providers";
import { useLayoutEffect, useState } from "react";
import clsx from "clsx";
import InitProfile from "@/components/profile/InitProfile";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";
import Button from "@/components/UI/Button";
import { formatAddress } from "@/utils/string.util";
import { ModalProvider } from "@/components/providers/ModalProvider";
import { toast } from "react-toastify";

const ProfileLayout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const { activeAccount, isReady, isActive, connectedAccounts, activeAddress } =
    useWallet();
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

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${window.location.protocol}//${window.location.host}/@${activeAddress}`
    );
    toast.success("Link copied");
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
    redirect("/");
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
          <div className="bg-indigo-100 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <InformationCircleIcon width={20} height={20} />
              <span className="font-bold">Your AlgoPass is live:</span>
              {activeAddress ? (
                <a
                  href={`${window.location.protocol}//${window.location.host}/@${activeAddress}`}
                  target="_blank"
                  className="underline"
                >{`${window.location.protocol}//${
                  window.location.host
                }/@${formatAddress(activeAddress)}`}</a>
              ) : null}
            </div>
            <div>
              <Button variant="danger" onClick={handleCopy}>
                Copy
              </Button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

const ProfileLayoutWithProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  return (
    <ModalProvider>
      <ProfileProviders>
        <ProfileLayout>{children}</ProfileLayout>
      </ProfileProviders>
    </ModalProvider>
  );
};

export default ProfileLayoutWithProvider;
