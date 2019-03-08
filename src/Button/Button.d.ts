import * as React from 'react';
import { ButtonProps as MUIButtonProps } from '@material-ui/core/Button';
import { ButtonProps as CircularProgressProps } from '@material-ui/core/CircularProgress';

export interface ButtonProps {
  loading: boolean; 
  success: boolean; 
  fullWidth: boolean; 
  MUIButtonProps: MUIButtonProps,
  CircularProgressProps: CircularProgressProps
}

declare const Button: React.ComponentType<ButtonProps>;

export default Button;