import { useMutation } from "@tanstack/react-query";
import { useWallet } from "@txnlab/use-wallet";
import { useCallback } from "react";
import { toast } from "react-toastify";

const useUpdateAvatar = () => {
    const { activeAccount } = useWallet();

    const onSuccess = useCallback(
        () => {
            if (!activeAccount?.address) return;
            toast.success("Avatar updated successfully");
        },
        [activeAccount?.address]
    );

    return useMutation({
        mutationFn: async (formData: FormData) => {
            if (!activeAccount?.address) return;
            toast.info("Updating avatar...");
            return fetch(`/api/avatar/${activeAccount.address}`, {
                method: "POST",
                body: formData
            });

        },
        onSuccess: (_, variables) => onSuccess(),
    });
};

export default useUpdateAvatar;