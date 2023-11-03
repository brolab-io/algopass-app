"use client";
import Image from "next/image";
import {
  Bars3Icon,
  ChartBarIcon,
  IdentificationIcon,
  DocumentTextIcon,
  GlobeAsiaAustraliaIcon,
  BellAlertIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { open_sans } from "@/app/fonts";
import { PropsWithChildren } from "react";

const menuItems = [
  {
    label: "Dashboard",
    href: "/profile",
    Icon: ChartBarIcon,
  },
  {
    label: "Information",
    href: "/profile/info",
    Icon: IdentificationIcon,
  },
  {
    label: "Social Links",
    href: "/profile/social",
    Icon: GlobeAsiaAustraliaIcon,
  },
  {
    label: "Personalization",
    href: "/profile/personalization",
    Icon: DocumentTextIcon,
  },

  {
    label: "Notifications",
    href: "/profile/notifications",
    Icon: BellAlertIcon,
  },
  {
    label: "Account",
    href: "/profile/account",
    Icon: UserCircleIcon,
  },
] as const;

type Props = {
  hideSidebar?: () => void;
};

const Sidebar: React.FC<Props> = ({ hideSidebar }) => {
  const pathname = usePathname();

  return (
    <div className="bg-white flex h-full flex-col">
      <div className="flex h-full flex-col flex-1">
        <div className={clsx("text-[#C7C7C7] font-bold px-[50px]", open_sans.className)}>
          MAIN MENU
        </div>
        <div className="py-[25px] transition-all">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={hideSidebar}
                className={clsx(
                  "flex items-center py-[11px] px-[50px] hover:bg-[#F9F9F9] gap-x-[26px] relative",
                  isActive ? "text-primary font-bold" : "text-[#A5A5A5] font-medium"
                )}
              >
                <item.Icon className="w-[28px] h-[28px]" />
                <div className="text-lg">{item.label}</div>
                <div
                  className={clsx(
                    "absolute top-0 right-0 bottom-0 w-1.5 rounded-3xl bg-primary",
                    isActive ? "opacity-100" : "opacity-0"
                  )}
                ></div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="px-[50px]">
        <div className="relative">
          <Image src="/assets/images/sidebar-banner.png" height={518} width={490} alt="AlgoPass" />
          <div className="absolute inset-0 py-12">
            <div className="text-3xl font-bold text-white pl-14 pr-8 -mt-0.5">AlgoPass</div>
            <div className="text-xl mt-4 pl-6 pr-4 text-white">
              Create your own professional and creative bio page
            </div>
          </div>
        </div>
      </div>
      <div className="mb-5 px-[50px] flex justify-center">
        <div>
          Created by <b>Brolab Team ❤️</b>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
