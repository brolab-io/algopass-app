import { queryClient } from "@/app/profile/providers";
import { useAlgoPassContext } from "@/components/providers/AlgoProvider";
import { useMutation } from "@tanstack/react-query";
import { useWallet } from "@txnlab/use-wallet";
import algosdk, { BoxReference, decodeAddress } from "algosdk";

const useInitProfile = () => {
  const { algopassClient, appID, appAddress, client } = useAlgoPassContext();
  const { activeAccount } = useWallet();

  return useMutation({
    mutationFn: async () => {
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
      return algopassClient.initProfile(
        {
          payment: paymentTx,
          urls: [["email", ""]],
        },
        { boxes }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["remote-profile", activeAccount?.address],
      });
    },
  });
};

export default useInitProfile;
