import { queryClient } from "@/app/profile/providers";
import { useAlgoPassContext } from "@/components/providers/AlgoProvider";
import { UserRecord } from "@/contract/AlgopassClient";
import { AlgoAmount } from "@algorandfoundation/algokit-utils/types/amount";
import { useMutation } from "@tanstack/react-query";
import { useWallet } from "@txnlab/use-wallet";
import algosdk, { BoxReference, decodeAddress } from "algosdk";
import { toast } from "react-toastify";

const useInitProfile = () => {
  const { algopassClient, appID, appAddress, client } = useAlgoPassContext();
  const { activeAccount, getAccountInfo } = useWallet();

  return useMutation({
    mutationFn: async (payload: UserRecord) => {
      if (!activeAccount?.address) return;

      // check balance
      const balance = await getAccountInfo();
      const mbr = balance["min-balance"] + Number(process.env.NEXT_PUBLIC_MINIMUM_BALANCE_REQUIRE!)
      if (balance.amount.algos().valueOf() < mbr) {
        toast.error(
          `Minimum balance required to initialize profile is  ${AlgoAmount.MicroAlgos(mbr)}. You have ${balance.amount.microAlgos()}.`
        );
        console.log(balance);
        return;
      }


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
