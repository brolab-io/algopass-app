"use client";
import { formatAddress } from "@/utils/string";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/20/solid";
import { useWallet } from "@txnlab/use-wallet";
import Image from "next/image";

const Navbar = () => {
  const { activeAccount } = useWallet();
  return (
    <nav className="bg-white flex items-center justify-between fixed inset-x-0 top-0 z-10">
      <div className="py-6 pl-14 pr-8 flex w-full justify-between items-center lg:max-w-[345px]">
        <div className="flex items-center gap-x-4">
          <Image src="/logo.png" height={54} width={54} className="h-[54px]" alt="AlgoPass" />
          <span className="font-bold text-2xl">AlgoPass</span>
        </div>
        <Bars3Icon fontSize={46} className="h-[40px] cursor-pointer" />
      </div>
      <div className="pr-10">
        <div className="flex items-center justify-between gap-x-4 w-full min-w-[220px] hover:bg-primary/10 py-2 px-4 rounded-xl transition-all cursor-pointer">
          <div className="flex items-center gap-x-4">
            <div className="aspect-square h-[54px] rounded-[14px] bg-slate-300"></div>
            <div className="space-y-0.5">
              <div className="font-bold text-black">AlgoPass User</div>
              <div className="text-[#C4C4C4] text-sm">
                {formatAddress(activeAccount?.address || "")}
              </div>
            </div>
          </div>
          <ChevronDownIcon className="h-[20px] text-[#C4C4C4]" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
