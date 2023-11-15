import { ModalContext } from "@/components/providers/ModalProvider";
import { useContext } from "react";


export const useModal = () => useContext(ModalContext);