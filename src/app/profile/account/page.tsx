import { open_sans } from "@/app/fonts";
import clsx from "clsx";

const AccountPage = () => {
  return (
    <div>
      <div>
        <h1 className="text-[34px] font-bold space-y-4">Account</h1>
        <span className={clsx("text-lg text-[#A5A5A5]", open_sans.className)}>
          Manage your account
        </span>
      </div>
    </div>
  );
};

export default AccountPage;
