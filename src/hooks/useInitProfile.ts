import { queryClient } from "@/app/profile/providers";
import { useAlgoPassContext } from "@/components/providers/AlgoProvider";
<<<<<<< HEAD
<<<<<<< HEAD
import { UserRecord } from "@/contract/AlgopassClient";
import { useMutation } from "@tanstack/react-query";
import { useWallet } from "@txnlab/use-wallet";
import algosdk, { BoxReference, decodeAddress } from "algosdk";
import { toast } from "react-toastify";
=======
import { useMutation } from "@tanstack/react-query";
import { useWallet } from "@txnlab/use-wallet";
import algosdk, { BoxReference, decodeAddress } from "algosdk";
>>>>>>> a6e4473 (call contract)
=======
import { useMutation } from "@tanstack/react-query";
import { useWallet } from "@txnlab/use-wallet";
import algosdk, { BoxReference, decodeAddress } from "algosdk";
>>>>>>> efdf7f0 (call contract)

const useInitProfile = () => {
  const { algopassClient, appID, appAddress, client } = useAlgoPassContext();
  const { activeAccount } = useWallet();

  return useMutation({
<<<<<<< HEAD
<<<<<<< HEAD
    mutationFn: async (payload: UserRecord) => {
=======
    mutationFn: async () => {
>>>>>>> a6e4473 (call contract)
=======
    mutationFn: async () => {
>>>>>>> efdf7f0 (call contract)
      if (!activeAccount?.address) return;
      const boxes: BoxReference[] = [
        { appIndex: appID, name: decodeAddress(activeAccount.address).publicKey },
      ];

      const suggestedParams = await client.getTransactionParams().do();

      const paymentTx = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
        from: activeAccount.address,
        to: appAddress,
        amount: 1000000,
        suggestedParams,
      });
<<<<<<< HEAD
<<<<<<< HEAD
      // await algopassClient.removeProfile({}, { boxes });
      return algopassClient.initProfile(
        {
          payment: paymentTx,
          ...payload,
=======
=======
>>>>>>> efdf7f0 (call contract)
      return algopassClient.initProfile(
        {
          payment: paymentTx,
          urls: [["email", ""]],
<<<<<<< HEAD
>>>>>>> a6e4473 (call contract)
=======
>>>>>>> efdf7f0 (call contract)
        },
        { boxes }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["remote-profile", activeAccount?.address],
      });
    },
<<<<<<< HEAD
<<<<<<< HEAD
    onError: (error, variables) => {
      if (error.message.includes("Request Rejected")) {
        toast.error(error.message);
        return;
      }
      toast.error("Failed to initialize profile");
      console.error(variables);
      console.error(error);
    },
=======
>>>>>>> a6e4473 (call contract)
=======
>>>>>>> efdf7f0 (call contract)
  });
};

export default useInitProfile;
