import { HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: string | JSX.Element;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
}

export function Button({
  children,
  iconLeft,
  iconRight,
  ...rest
}: ButtonProps) {
  return (
    <button className="" {...rest}>
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
