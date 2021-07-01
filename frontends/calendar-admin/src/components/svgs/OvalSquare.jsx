import React from 'react';

const OvalSquare = ({ iconColor }) => (
  <svg
    version="1.1"
    viewBox="0 0 15 15"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>Rectangle</title>
    <desc>Created with Sketch.</desc>
    <g
      fill="none"
      fillRule="evenodd"
      id="Symbols"
      stroke="none"
      strokeWidth="1"
    >
      <g
        fill="#FA7E23"
        fillRule="nonzero"
        id="1:1-Private-Meeting-small"
        transform="translate(-23.000000, -64.000000)"
      >
        <rect
          fill={iconColor}
          height="15"
          id="Rectangle"
          rx="4"
          width="15"
          x="23"
          y="64"
        />
      </g>
    </g>
  </svg>
);

export default OvalSquare;
