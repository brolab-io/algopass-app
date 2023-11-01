import { open_sans } from "@/app/fonts";
import clsx from "clsx";

const PersonalizationPage = () => {
  return (
    <div>
      <div>
        <h1 className="text-[34px] font-bold space-y-4">Personalization</h1>
        <span className={clsx("text-lg text-[#A5A5A5]", open_sans.className)}>
          Personalize your profile page
        </span>
      </div>
    </div>
  );
};

export default PersonalizationPage;
