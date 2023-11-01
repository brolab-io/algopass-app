"use client";
import { ForwardRefRenderFunction, forwardRef } from "react";

type InputProps = React.DetailedHTMLProps<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
> & {
  label: string;
};

const Textarea: ForwardRefRenderFunction<HTMLTextAreaElement, InputProps> = (
  { label, ...props },
  ref
) => {
  return (
    <div className="space-y-1">
      <label htmlFor={props.name} className="block font-bold text-[#27272A]">
        {label}
      </label>
      <textarea
        {...props}
        ref={ref}
        className="border-[#DDDDE3] border bg-white rounded px-4 py-3 w-full"
      />
    </div>
  );
};

export default forwardRef<HTMLTextAreaElement, InputProps>(Textarea);
