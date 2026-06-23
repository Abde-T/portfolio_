import React, { ReactNode } from "react";
import clsx from "clsx";

interface SplitHeadingProps {
  children: string;
  className?: string;
  splitBy?: "chars" | "words";
  wrapperClass?: string;
  itemClass?: string;
}

export function SplitHeading({
  children,
  className,
  splitBy = "chars",
  wrapperClass,
  itemClass,
}: SplitHeadingProps) {
  const elements = splitBy === "chars" ? children.split("") : children.split(" ");

  return (
    <div className={clsx("relative inline-block", className)}>
      {elements.map((el, i) => (
        <span
          key={i}
          className={clsx("inline-block overflow-hidden", wrapperClass, {
            "mr-[0.25em]": splitBy === "words" && i !== elements.length - 1,
          })}
        >
          <span
            className={clsx(
              "inline-block",
              splitBy === "chars" ? "char" : "word",
              itemClass
            )}
            style={el === " " && splitBy === "chars" ? { width: "0.25em" } : {}}
          >
            {el}
          </span>
        </span>
      ))}
    </div>
  );
}
