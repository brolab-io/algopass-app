import AlgoProvider from "./AlgoProvider";
import WalletProvider from "./WalletProvider";

const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <WalletProvider>
      <AlgoProvider>{children}</AlgoProvider>
    </WalletProvider>
  );
};

export default Providers;
