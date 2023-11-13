import { PropsWithChildren, createContext, useContext, useMemo } from "react";
import {
  QueryClientProvider,
  QueryClient,
  useQuery,
} from "@tanstack/react-query";
import { useWallet } from "@txnlab/use-wallet";
import { getProfile } from "@/services/profile.service";
import { TSocialLink, TUser } from "@/utils/supabase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useProfile from "@/hooks/useProfile";
import { UserRecord } from "@/contract/AlgopassClient";

export const queryClient = new QueryClient();

type TProfileContext = {
  user?: UserRecord | null;
  isLoading: boolean;
  refetch: () => void;
  error: Error | null;
};
const ProfileContext = createContext({} as TProfileContext);

export const useProfileContext = () => useContext(ProfileContext);

const ProfileContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const { activeAccount } = useWallet();
  const { data, isLoading, refetch, error } = useProfile(
    activeAccount?.address
  );

  const contextValue = useMemo(
    () => ({
      user: data,
      isLoading,
      refetch,
      error,
    }),
    [data, isLoading, refetch, error]
  );

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

const ProfileProviders: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ProfileContextProvider>{children}</ProfileContextProvider>
      <ToastContainer />
    </QueryClientProvider>
  );
};

export default ProfileProviders;
