import { useAlgoPassContext } from "@/components/providers/AlgoProvider";
import { decodeProfile } from "@/utils/decode.util";
import { useQuery } from "@tanstack/react-query";
import { decodeAddress } from "algosdk";
<<<<<<< HEAD
<<<<<<< HEAD
import { isProfileNotFound } from "@/utils/contract.util";
=======
>>>>>>> a6e4473 (call contract)
=======
>>>>>>> efdf7f0 (call contract)

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
<<<<<<< HEAD
<<<<<<< HEAD
        if (isProfileNotFound(error)) {
=======
        const _error = error as any;
        if ("status" in _error && _error.status === 404) {
>>>>>>> a6e4473 (call contract)
=======
        const _error = error as any;
        if ("status" in _error && _error.status === 404) {
>>>>>>> efdf7f0 (call contract)
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
