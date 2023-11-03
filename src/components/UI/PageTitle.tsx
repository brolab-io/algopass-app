import { open_sans } from "@/app/fonts";
import clsx from "clsx";

type Props = {
  title: string;
  subtitle: string;
};

const PageTitle: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="text-[28px] md:text-[32px] lg:text-[34px] font-bold space-y-4">{title}</h1>
      <span className={clsx("text-base lg:text-lg text-[#A5A5A5]", open_sans.className)}>
        {subtitle}
      </span>
    </div>
  );
};

export default PageTitle;
