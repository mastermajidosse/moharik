import { forwardRef, HTMLAttributes } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: string | JSX.Element;
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
}

// eslint-disable-next-line react/display-name
export const SquaredSolidButton = forwardRef((props: ButtonProps, ref: any) => {
  const { children, iconLeft, iconRight, ...rest } = props;
  return (
    <button
      ref={ref}
      className="mt-8 py-3 px-6 rounded-[0.25rem] bg-primary-500 text-white shadow-md shadow-lightDark/20 hover:bg-primary-600 duration-300"
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
});
