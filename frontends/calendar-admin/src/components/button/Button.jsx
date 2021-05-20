import React from 'react';

const Button = ({ className, onBtnClick, children }) => (
  <button
    className={className}
    type="button"
    onClick={(e) => (onBtnClick ? onBtnClick() : e.preventDefault())}
  >
    {children}
  </button>
);
export default Button;
