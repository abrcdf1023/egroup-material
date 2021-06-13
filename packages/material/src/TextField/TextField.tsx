import React, { FC } from 'react';
import warning from 'warning';
import {
  createStyles,
  TextField as MuiTextField,
  StandardTextFieldProps as MuiStandardTextFieldProps,
  FilledTextFieldProps as MuiFilledTextFieldProps,
  OutlinedTextFieldProps as MuiOutlinedTextFieldProps,
  withStyles,
  Theme,
  WithStyles,
} from '@material-ui/core';
import clsx from 'clsx';

export interface BaseTextFieldProps {
  /**
   * Set success color.
   */
  success?: boolean;
  /**
   * Set warning color.
   */
  warning?: boolean;
  /**
   * Set variant outlined rounded.
   */
  rounded?: boolean;
  /**
   * Set variant outlined shadowed.
   */
  shadowed?: boolean;
}

export type StandardTextFieldProps = BaseTextFieldProps &
  MuiStandardTextFieldProps;
export type FilledTextFieldProps = BaseTextFieldProps & MuiFilledTextFieldProps;
export type OutlinedTextFieldProps = BaseTextFieldProps &
  MuiOutlinedTextFieldProps;

export type TextFieldProps =
  | StandardTextFieldProps
  | FilledTextFieldProps
  | OutlinedTextFieldProps;

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '& .MuiInputBase-root.Mui-disabled.Mui-disabled .MuiOutlinedInput-notchedOutline': {
        borderColor: 'transparent',
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiInputBase-input': {
        caretColor: theme.egPalette.text[1],
      },
    },
    rounded: {
      '& .MuiOutlinedInput-root': {
        borderRadius: theme.egShape.borderRadius,
      },
    },
    shadowed: {
      '& .MuiOutlinedInput-root': {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
      },
      '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
      },
    },
    success: {
      '& .MuiFormLabel-root': {
        color: theme.egPalette.success[1],
      },
      '& .MuiInputBase-root': {
        color: theme.egPalette.success[1],
        caretColor: theme.egPalette.success[1],
      },
      '& .MuiInputBase-root.Mui-disabled': {
        color: theme.egPalette.success[0],
      },
      '& .MuiInput-underline:after, & .MuiInput-underline:before': {
        borderBottomColor: theme.egPalette.success[1],
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: theme.egPalette.success[1],
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.success[1],
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.success[1],
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.success[1],
      },
    },
    warning: {
      '& .MuiFormLabel-root': {
        color: theme.egPalette.warning[1],
      },
      '& .MuiInputBase-root': {
        color: theme.egPalette.warning[1],
        caretColor: theme.egPalette.warning[1],
      },
      '& .MuiInputBase-root.Mui-disabled': {
        color: theme.egPalette.warning[0],
      },
      '& .MuiInput-underline:after, & .MuiInput-underline:before': {
        borderBottomColor: theme.egPalette.warning[1],
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: theme.egPalette.warning[1],
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.warning[1],
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.warning[1],
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.warning[1],
      },
    },
    error: {
      '& .MuiFormLabel-root': {
        color: theme.egPalette.error[1],
      },
      '& .MuiInputBase-root': {
        color: theme.egPalette.error[1],
        caretColor: theme.egPalette.error[1],
      },
      '& .MuiInputBase-root.Mui-disabled': {
        color: theme.egPalette.error[0],
      },
      '& .MuiInput-underline:after, & .MuiInput-underline:before': {
        borderBottomColor: theme.egPalette.error[1],
      },
      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: theme.egPalette.error[1],
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.error[1],
      },
      '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.error[1],
      },
      '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: theme.egPalette.error[1],
      },
    },
  });

const TextField: FC<TextFieldProps & WithStyles<typeof styles>> = ({
  className,
  classes: {
    success: successClasses,
    warning: warningClasses,
    error: errorClasses,
    rounded: roundedClasses,
    shadowed: shadowedClasses,
    ...classes
  },
  success,
  warning: warningProp,
  error,
  rounded = false,
  shadowed = false,
  variant,
  ...others
}) => {
  warning(
    variant !== 'outlined' ? !rounded : true,
    'TextField should not use rounded when variant is not outlined!'
  );
  warning(
    variant !== 'outlined' ? !shadowed : true,
    'TextField should not use shadowed when variant is not outlined!'
  );
  return (
    <MuiTextField
      className={clsx(className, {
        [successClasses]: success,
        [warningClasses]: warningProp,
        [errorClasses]: error,
        [roundedClasses]: rounded,
        [shadowedClasses]: shadowed,
      })}
      classes={classes}
      variant={variant}
      {...others}
    />
  );
};

export default withStyles(styles, { name: 'EgTextField' })(TextField);
