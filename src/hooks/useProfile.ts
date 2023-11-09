import { useAlgoPassContext } from "@/components/providers/AlgoProvider";
import { decodeProfile } from "@/utils/decode.util";
import { useQuery } from "@tanstack/react-query";
import { decodeAddress } from "algosdk";
import { isProfileNotFound } from "@/utils/contract.util";

const useProfile = (walletAddress?: string) => {
  const { appID, client } = useAlgoPassContext();

  return useQuery({
    queryKey: ["remote-profile", walletAddress],
    queryFn: async () => {
      if (!walletAddress) return;
      try {
        const box = await client
          .getApplicationBoxByName(appID, decodeAddress(walletAddress).publicKey)
          .do();
        return decodeProfile(box.value);
      } catch (error) {
        if (isProfileNotFound(error)) {
          return null;
        }
        throw error;
      }
    },
    enabled: !!walletAddress,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
  });
};

export default useProfile;
