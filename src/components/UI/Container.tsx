import clsx from "clsx";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

const Container: React.FC<React.PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <div className={clsx("max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full", className)}>
      {children}
    </div>
  );
};

export default Container;
