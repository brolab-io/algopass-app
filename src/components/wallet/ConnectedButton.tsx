"use client";
import { useWallet } from "@txnlab/use-wallet";
import Button from "../UI/Button";
import { formatAddress } from "@/utils/string.util";
import {
  ChevronDownIcon,
  HomeIcon,
  PencilSquareIcon,
  ShareIcon,
  SignalSlashIcon,
  UserCircleIcon,
  WalletIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useCallback, useMemo } from "react";
import Link from "next/link";
import { useModal } from "@/hooks/useModal";

const ConnectedButton = () => {
  const { activeAddress, providers } = useWallet();
  const { shareModalHandle } = useModal();

  const activeProvider = useMemo(() => {
    if (!providers || !activeAddress) return null;
    return providers.find((provider) => provider.isActive);
  }, [activeAddress, providers]);

  const handleDisconnect = useCallback(() => {
    if (!activeProvider) return;
    activeProvider.disconnect();
  }, [activeProvider]);

  if (!activeAddress) {
    return null;
  }
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="rounded font-bold px-6 lg:px-8 py-2 lg:py-3 transition-all duration-300 flex items-center gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base bg-primary text-white">
          <WalletIcon className="w-6 h-6" />
          {formatAddress(activeAddress)}
          <ChevronDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-gray-100">
          <div className="py-1">
            <Menu.Item>
              <Link
                className="w-full bg-white hover:bg-gray-100 transition-colors duration-300 rounded font-bold px-6 lg:px-8 py-2 lg:py-3 flex items-center gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base text-gray-600 hover:text-indigo-500"
                href={"/"}
              >
                <HomeIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Home
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                className="w-full bg-white hover:bg-gray-100 transition-colors duration-300 rounded font-bold px-6 lg:px-8 py-2 lg:py-3 flex items-center gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base text-gray-600 hover:text-indigo-500"
                href={"/profile"}
              >
                <UserCircleIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Profile
              </Link>
            </Menu.Item>
            <Menu.Item>
              <button
                className="w-full bg-white hover:bg-gray-100 transition-colors duration-300 rounded font-bold px-6 lg:px-8 py-2 lg:py-3 flex items-center gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base text-gray-600 hover:text-indigo-500"
                onClick={shareModalHandle}
              >
                <ShareIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Share
              </button>
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              <button
                className="w-full bg-white hover:bg-gray-100 transition-colors duration-300 rounded font-bold px-6 lg:px-8 py-2 lg:py-3 flex items-center gap-x-2 disabled:opacity-50 disabled:cursor-not-allowed text-sm lg:text-base text-gray-600 hover:text-indigo-500"
                onClick={handleDisconnect}
              >
                <SignalSlashIcon
                  className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Diconnect
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
export default ConnectedButton;
