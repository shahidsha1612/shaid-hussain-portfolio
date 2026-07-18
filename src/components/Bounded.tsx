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
                className={clsx("px-4 py-10 md:px-8 md:py-14 lg:px-12 lg:py-16", className)}
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