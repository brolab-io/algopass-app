"use client";
import { useModal } from "@/hooks/useModal";
import { Dialog, Transition } from "@headlessui/react";
import { ShareIcon } from "@heroicons/react/24/outline";
import { useWallet } from "@txnlab/use-wallet";
import { Fragment, useMemo } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
const ShareModal = () => {
  const { shareModalHandle, shareModalVisibility } = useModal();
  const { activeAddress } = useWallet();

  const profileUrl = useMemo(() => {
    if (!activeAddress) return "";
    return `${window.location.protocol}//${window.location.host}/@${activeAddress}`;
  }, [activeAddress]);

  if (!activeAddress) return null;
  return (
    <Transition.Root show={shareModalVisibility} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={shareModalHandle}>
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
                <div>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <ShareIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Share your profile
                    </Dialog.Title>
                    <div className="mt-4">
                      <div className="flex gap-3 justify-center">
                        <FacebookShareButton url={profileUrl}>
                          <FacebookIcon round size={40} />
                        </FacebookShareButton>
                        <TwitterShareButton url={profileUrl}>
                          <TwitterIcon round size={40} />
                        </TwitterShareButton>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={shareModalHandle}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default ShareModal;
