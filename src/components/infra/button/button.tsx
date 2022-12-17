import './button.scss';
import React from 'react';
import MuiButton from '@mui/material/Button';
export interface ButtonProps {
  label: string;
  size?: 'big' | 'medium' | 'small';
  className?: string;
  onClick?: () => void;
  type?: 'primary' | 'secondary' | 'text';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const primaryDisabled = props.disabled && props.type === 'primary';
  const secondaryDisabled = props.disabled && props.type === 'secondary';
  const textDisabled = props.disabled && props.type === 'text';

  return (
    <MuiButton data-testid={`Button}`}
      className={`button ${props.className} ${props.type} ${props.size} 
      ${primaryDisabled && 'primary--disabled' || ''} 
      ${textDisabled && 'text--disabled' || ''} 
      ${secondaryDisabled && 'secondary--disabled' || ''}`}
      disabled={props.disabled}
      type="button"
      onClick={props.onClick}
      variant="contained"
    >
      {props.label}
    </MuiButton>
  );
};
