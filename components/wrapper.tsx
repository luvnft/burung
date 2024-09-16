import React from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Wrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-screen-2xl px-2.5 md:px-10",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Wrapper;
