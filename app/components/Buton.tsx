import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { cn } from "../lib/utils";

type ButtonProps = {
  children: ReactNode
} & ComponentProps<'button'>
export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button 
    className={cn("bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-bold"
      , className)} 
    {...props}
    >
      {children}
    </button>
  );
}