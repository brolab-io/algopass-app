"use client";
import { ForwardRefRenderFunction, forwardRef } from "react";

type InputProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label: string;
  currentLength?: number;
};

const Textarea: ForwardRefRenderFunction<HTMLTextAreaElement, InputProps> = (
  { label, currentLength, ...props },
  ref
) => {
  return (
    <div className="space-y-1">
      <label htmlFor={props.name} className="block font-bold text-[#27272A] text-sm lg:text-base">
        {label}
      </label>
<<<<<<< HEAD
      <div className="relative">
        <textarea
          {...props}
          ref={ref}
          className="border-[#DDDDE3] border bg-white rounded px-4 py-3 w-full disabled:bg-[#F9F9F9] disabled:cursor-not-allowed text-sm lg:text-base"
        />
        {props.maxLength && (
          <div className="absolute right-2.5 bottom-2.5 text-xs text-gray-700">
            {currentLength || 0}/{props.maxLength}
          </div>
        )}
      </div>
=======
      <textarea
        {...props}
        ref={ref}
        className="border-[#DDDDE3] border bg-white rounded px-4 py-3 w-full disabled:bg-[#F9F9F9] disabled:cursor-not-allowed"
      />
>>>>>>> a6e4473 (call contract)
    </div>
  );
};

export default forwardRef<HTMLTextAreaElement, InputProps>(Textarea);
