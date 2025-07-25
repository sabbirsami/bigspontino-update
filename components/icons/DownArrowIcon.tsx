import React from 'react';

interface DownArrowIconProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const DownArrowIcon: React.FC<DownArrowIconProps> = ({
  width = '20',
  height = '20',
  className,
}) => {
  return (
    <svg
      fill="currentcolor"
      width={width}
      height={height}
      className={className}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path d="M78.466,35.559L50.15,63.633L22.078,35.317c-0.777-0.785-2.044-0.789-2.828-0.012s-0.789,2.044-0.012,2.827L48.432,67.58 c0.365,0.368,0.835,0.563,1.312,0.589c0.139,0.008,0.278-0.001,0.415-0.021c0.054,0.008,0.106,0.021,0.16,0.022 c0.544,0.029,1.099-0.162,1.515-0.576l29.447-29.196c0.785-0.777,0.79-2.043,0.012-2.828S79.249,34.781,78.466,35.559z" />
      </g>
    </svg>
  );
};

export default DownArrowIcon;
