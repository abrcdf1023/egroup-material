import React, { CSSProperties, FC } from 'react';
import clsx from 'clsx';
import {
  CircularProgress,
  CircularProgressProps,
  createStyles,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import ButtonBase, { ButtonBaseProps } from './ButtonBase';

export const styles = () =>
  createStyles({
    root: {
      display: 'inline-flex',
      position: 'relative',
    },
    fullWidth: {
      width: '100%',
    },
    progress: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  });

export interface ButtonProps
  extends Omit<ButtonBaseProps, 'classes'>,
    WithStyles<typeof styles> {
  /**
   * The button's loading status
   */
  loading?: boolean;
  /**
   * Circular Progress Props
   */
  MuiCircularProgressProps?: CircularProgressProps;
  /**
   * Mui `Button` className
   */
  muiButtonClassName?: string;
  /**
   * Mui `Button` className
   */
  muiButtonStyle?: CSSProperties;
  /**
   * Mui `Button` classes
   */
  muiButtonClasses?: ButtonBaseProps['classes'];
}

export const BaseButton: FC<ButtonProps> = (props) => {
  const {
    classes,
    className,
    style,
    muiButtonClassName,
    muiButtonStyle,
    muiButtonClasses,
    fullWidth,
    loading = false,
    MuiCircularProgressProps,
    disabled: disabledProp,
    ...other
  } = props;

  const disabled = disabledProp || loading;

  return (
    <div
      className={clsx(
        classes.root,
        {
          [classes.fullWidth]: fullWidth,
        },
        className
      )}
      style={style}
    >
      <ButtonBase
        classes={muiButtonClasses}
        className={muiButtonClassName}
        style={muiButtonStyle}
        disabled={disabled}
        fullWidth={fullWidth}
        {...other}
      />
      {loading && (
        <CircularProgress
          size={24}
          className={clsx(
            classes.progress,
            MuiCircularProgressProps?.className
          )}
          {...MuiCircularProgressProps}
        />
      )}
    </div>
  );
};

export default withStyles(styles, {
  name: 'EgButton',
})(BaseButton);
