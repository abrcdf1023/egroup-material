import React, { FC, ReactNode } from 'react';
import {
  FormControlLabel,
  Radio as MuiRadio,
  RadioProps as MuiRadioProps
} from '@material-ui/core';

export interface RadioProps extends MuiRadioProps {
  /**
   * The text to be used in an enclosing label element.
   */
  label?: ReactNode;
  /**
   * The position of the label.
   */
  labelPlacement?: 'end' | 'start' | 'top' | 'bottom';
}

const Radio: FC<RadioProps> = ({ label, ...other }) => (
  <FormControlLabel control={<MuiRadio {...other} />} label={label} />
);

export default Radio;
