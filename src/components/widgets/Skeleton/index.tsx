import React from "react";
import { SkeletonDiv } from "./styles";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  width: string;
  height: string;
}

function Skeleton({ width, height, ...props }: SkeletonProps) {
  return <SkeletonDiv height={height} width={width} {...props} />;
}

export { Skeleton };
