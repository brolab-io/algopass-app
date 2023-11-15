"use client";
import { PropsWithChildren, createContext, useState } from "react";
import ShareModal from "../UI/ShareModal";

const ModalContext = createContext({
  shareModalVisibility: false,
  shareModalHandle: () => {},
});

const ModalProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const [shareModalVisibility, setShareModalvisibility] = useState(false);
  const shareModalHandle = () => {
    setShareModalvisibility(!shareModalVisibility);
  };
  return (
    <ModalContext.Provider
      value={{
        shareModalVisibility,
        shareModalHandle,
      }}
    >
      <>
        {children}
        <ShareModal />
      </>
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
