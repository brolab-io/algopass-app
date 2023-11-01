import clsx from "clsx";
import { useMemo } from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "primary" | "secondary" | "danger";
  icon: React.ReactNode;
  isLoading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  type,
  className,
  children,
  isLoading,
  icon,
  disabled,
  ...props
}) => {
  const variantClass = useMemo(() => {
    switch (variant) {
      case "primary":
        return "bg-primary text-white";
      case "secondary":
        return "bg-[#F9F9F9] text-[#A5A5A5]";
      case "danger":
        return "bg-[#FF4D4F] text-white";
    }
  }, [variant]);

  return (
    <button
      disabled={isLoading || disabled}
      className={clsx(
        "rounded font-bold px-8 py-3 transition-all duration-300 flex items-center gap-x-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClass,
        className
      )}
      type={type || "button"}
      {...props}
    >
      {isLoading ? (
        <div className="w-[18px] h-[18px] border-2 border-dashed rounded-full animate-spin border-white"></div>
      ) : icon ? (
        <span>{icon}</span>
      ) : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
