import React from "react";

const ProgressBarIcon = () => {
  return (
    <svg
      width="749"
      height="24"
      viewBox="0 0 749 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="10"
        width="749"
        height="4"
        rx="2"
        fill="white"
        fillOpacity="0.04"
      />
      <rect y="10" width="254" height="4" rx="2" fill="#FACD66" />
      <g filter="url(#filter0_d_19_145)">
        <circle cx="250" cy="12" r="4" fill="#FACD66" />
      </g>
      <circle cx="250" cy="12" r="6.5" stroke="white" />
      <defs>
        <filter
          id="filter0_d_19_145"
          x="238"
          y="0"
          width="24"
          height="24"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.92 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_19_145"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_19_145"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default ProgressBarIcon;
