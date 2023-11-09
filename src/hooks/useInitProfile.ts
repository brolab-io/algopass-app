import { queryClient } from "@/app/profile/providers";
import { useAlgoPassContext } from "@/components/providers/AlgoProvider";
import { UserRecord } from "@/contract/AlgopassClient";
import { useMutation } from "@tanstack/react-query";
import { useWallet } from "@txnlab/use-wallet";
import algosdk, { BoxReference, decodeAddress } from "algosdk";
import { toast } from "react-toastify";

const useInitProfile = () => {
  const { algopassClient, appID, appAddress, client } = useAlgoPassContext();
  const { activeAccount } = useWallet();

  return useMutation({
    mutationFn: async (payload: UserRecord) => {
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
      // await algopassClient.removeProfile({}, { boxes });
      return algopassClient.initProfile(
        {
          payment: paymentTx,
          ...payload,
        },
        { boxes }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["remote-profile", activeAccount?.address],
      });
    },
    onError: (error, variables) => {
      if (error.message.includes("Request Rejected")) {
        toast.error(error.message);
        return;
      }
      toast.error("Failed to initialize profile");
      console.error(variables);
      console.error(error);
    },
  });
};

export default useInitProfile;
