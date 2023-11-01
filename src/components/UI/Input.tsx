"use client";
import clsx from "clsx";
import { ForwardRefRenderFunction, forwardRef, useEffect, useMemo, useRef, useState } from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label: string;
  prefix?: string;
};

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, prefix, ...props },
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
    <div className="space-y-1 w-full">
      <label htmlFor={props.name} className="block font-bold text-[#27272A]">
        {label}
      </label>
      {prefix ? (
        <div className="relative">
          <input
            {...props}
            ref={ref}
            style={inputStyle}
            className={clsx(
              "border-[#DDDDE3] border font-medium bg-white rounded px-4 py-3 w-full",
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
          className="border-[#DDDDE3] border bg-white rounded px-4 py-3 w-full"
        />
      )}
    </div>
  );
};

export default forwardRef<HTMLInputElement, InputProps>(Input);
