import { useAlgoPassContext } from "@/components/providers/AlgoProvider";
import { useMutation } from "@tanstack/react-query";
import { useWallet } from "@txnlab/use-wallet";
import { BoxReference, decodeAddress } from "algosdk";
import { UserRecord } from "@/contract/AlgopassClient";
import { useCallback } from "react";
import { queryClient } from "@/app/profile/providers";
import { toast } from "react-toastify";

const useUpdateProfile = () => {
  const { algopassClient, appID } = useAlgoPassContext();
  const { activeAccount } = useWallet();

  const onSuccess = useCallback(
    (payload: UserRecord) => {
      if (!activeAccount?.address) return;
      queryClient.setQueryData(["remote-profile", activeAccount.address], (oldData: UserRecord) => {
        return { ...oldData, ...payload };
      });
      toast.success("Profile updated successfully");
    },
    [activeAccount?.address]
  );

  return useMutation({
    mutationFn: async (payload: UserRecord) => {
      if (!activeAccount?.address) return;

      const boxes: BoxReference[] = [
        { appIndex: appID, name: decodeAddress(activeAccount.address).publicKey },
      ];

      const result = await algopassClient.updateProfile(payload, { boxes });
      if (result.return) {
        return fetch(`/api/profile/${activeAccount.address}`, {
          method: "POST",
        });
      }
      else {
        throw new Error("Update profile failed");
      }
    },
    onSuccess: (_, variables) => onSuccess(variables),
  });
};

export default useUpdateProfile;
