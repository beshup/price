import React from 'react';
import './MrktButton.css';
import { Link } from 'react-router-dom';

const STYLES = ['MrktButton--buy', 'MrktButton--sell'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle
}) => {
  
const checkButtonStyle = STYLES.includes(buttonStyle)
? buttonStyle
: STYLES[0];

  return (
      <button
        className={`MrktButton ${checkButtonStyle}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
  );
};
