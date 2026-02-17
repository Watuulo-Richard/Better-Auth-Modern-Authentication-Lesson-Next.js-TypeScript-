import React from "react";

interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  className?: string;
  children?: React.ReactNode;
  variant?: string;
  contentKey?: string;
  viewBox?: string;
  fill?: string;
}

export const Icon: React.FC<IconProps> = ({ 
  className, 
  children, 
  variant, 
  contentKey,
  viewBox = "0 0 24 24",
  fill = "currentColor",
  ...props 
}) => {
  return (
    <svg 
      viewBox={viewBox} 
      fill={fill} 
      className={className} 
      {...props}
    >
      {children}
    </svg>
  );
};