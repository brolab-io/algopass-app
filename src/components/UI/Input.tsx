"use client";
import clsx from "clsx";
import { ForwardRefRenderFunction, forwardRef, useEffect, useMemo, useRef, useState } from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  prefix?: string;
  error?: string;
  Action?: React.ReactNode;
};

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, prefix, error, Action, ...props },
  ref
) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [spanWidth, setSpanWidth] = useState(0);

  const inputStyle = useMemo(() => {
    if (prefix) {
      return { paddingLeft: spanWidth + 16 };
    }
    return {};
  }, [prefix, spanWidth]);

  useEffect(() => {
    if (prefix) {
      const spanWidth = spanRef.current?.offsetWidth || 0;
      setSpanWidth(spanWidth);
    }
  }, [prefix]);

  return (
    <div className="lg:space-y-1 w-full">
      <div className="flex gap-x-4 items-center justify-between">
        <div className="flex gap-x-4 items-center">
          <label
            htmlFor={props.name}
            className="block font-bold text-[#27272A] text-sm lg:text-base"
          >
            {label}
          </label>
          {error && <span className="text-[#F44336] font-medium text-sm">{error}</span>}
        </div>
        {Action}
      </div>
      {prefix ? (
        <div className="relative">
          <input
            {...props}
            ref={ref}
            style={inputStyle}
            className={clsx(
              "border-[#DDDDE3] border font-medium bg-white rounded px-4 py-3 w-full text-sm lg:text-base",
              !spanWidth && "placeholder:opacity-0"
            )}
          />
          <span
            ref={spanRef}
            className="absolute left-4 font-medium opacity-50 top-1/2 -translate-y-1/2 pointer-events-none"
          >
            {prefix}
          </span>
        </div>
      ) : (
        <input
          {...props}
          ref={ref}
          className="border-[#DDDDE3] border bg-white rounded px-4 py-3 w-full disabled:bg-[#F9F9F9] disabled:cursor-not-allowed text-sm lg:text-base"
        />
      )}
    </div>
  );
};

export default forwardRef<HTMLInputElement, InputProps>(Input);
