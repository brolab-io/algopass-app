"use client";
import { Fragment, useCallback, useMemo, useState } from "react";
import Button from "../UI/Button";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon, SignalIcon } from "@heroicons/react/24/outline";
import Connect from "./Connect";
import { Account, Provider, useWallet } from "@txnlab/use-wallet";
import Image from "next/image";
import { formatAddress } from "@/utils/string.util";

const ConnectButton = () => {
  let [isOpen, setIsOpen] = useState(true);
  const { providers, activeAccount } = useWallet();

  const handleConnect = useCallback((provider: Provider) => {
    provider.connect();
    setIsOpen(false);
  }, []);

  const activeProvider = useMemo(() => {
    if (!providers || !activeAccount) return null;
    return providers.find((provider) => provider.isActive);
  }, [activeAccount, providers]);

  const handleDisconnect = useCallback(() => {
    if (!activeProvider) return;
    activeProvider.disconnect();
    setIsOpen(false);
  }, [activeProvider]);

  if (!activeAccount)
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Connect Wallet</Button>
        <Transition.Root show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={setIsOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <h2 className="text-center text-2xl font-bold mb-8">
                      Choose wallet provider
                    </h2>
                    <ul className="space-y-3">
                      {providers?.map((provider) => (
                        <li key={provider.metadata.id}>
                          <Button
                            variant="secondary"
                            className="flex w-full hover:bg-gray-100 space-x-6 transition-colors duration-300"
                            icon={
                              <Image
                                width={36}
                                height={36}
                                alt={provider.metadata.name}
                                src={provider.metadata.icon}
                                className="rounded-full w-9 h-9"
                              />
                            }
                            onClick={() => handleConnect(provider)}
                          >
                            <div className="flex items-center justify-around w-full space-x-2">
                              <h2 className="text-lg text-indigo-500">
                                {provider.metadata.name}
                              </h2>
                              {provider.isActive ? (
                                <>
                                  <SignalIcon
                                    className="h-5 w-5 text-green-400"
                                    aria-hidden="true"
                                  />
                                  {activeAccount ? (
                                    <span className="ml-3">
                                      (
                                      {formatAddress(
                                        (activeAccount as Account).address
                                      )}
                                      )
                                    </span>
                                  ) : null}
                                </>
                              ) : null}
                            </div>
                          </Button>
                        </li>
                      ))}
                    </ul>
                    {activeProvider ? (
                      <div className="mt-6">
                        <Button
                          className="w-full flex justify-center"
                          variant="danger"
                          onClick={handleDisconnect}
                        >
                          Disconnect
                        </Button>
                      </div>
                    ) : null}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </>
    );
};

export default ConnectButton;
