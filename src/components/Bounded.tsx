/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from "react";
import clsx from "clsx";

type BoundedProps = {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
};

const Bounded = React.forwardRef<HTMLElement, BoundedProps>(
    ({ as: Comp = "section", className, children, ...restProps }, ref) => {
        return (
            <Comp 
                ref={ref} 
                className={clsx("px-4 md:px-8  lg:px-12 ", className)}
                {...restProps}
            >
                <div className="mx-auto w-full">
                    {children}
                </div>
            </Comp>
        );
    }
) as React.ForwardRefExoticComponent<BoundedProps & React.RefAttributes<HTMLElement>>;

Bounded.displayName = "Bounded";

export default Bounded;