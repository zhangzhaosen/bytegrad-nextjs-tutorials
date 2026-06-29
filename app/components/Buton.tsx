import { ComponentProps, ReactNode } from "react";


type ButtonProps = {
  children: ReactNode
} & ComponentProps<'button'>
export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded
    font-bold"
    {...props}
    >
      {children}
    </button>
  );
}