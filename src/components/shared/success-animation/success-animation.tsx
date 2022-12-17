


import React from 'react';
import './success-animation.scss';

function SuccessIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="checkmark"
        viewBox="0 0 52 52"
      >
        <circle
          cx="26"
          cy="26"
          r="25"
          fill="none"
          className="checkmark__circle"
        ></circle>
        <path
          fill="none"
          d="M14.1 27.2l7.1 7.2 16.7-16.8"
          className="checkmark__check"
        ></path>
      </svg>
    );
  }
  

export const SuccessAnimation: React.FC = () => {
    return <div className='success-animation wrapper'> 
    { SuccessIcon() }
    </div>
}