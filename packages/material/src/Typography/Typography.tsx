import React, { CSSProperties, FC } from 'react';
import {
  createStyles,
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
  withStyles,
} from '@material-ui/core';

export interface TypographyProps
  extends Omit<MuiTypographyProps, 'fontWeight'> {
  fontWeight?: CSSProperties['fontWeight'];
}

const styles = () =>
  createStyles({
    h1: {
      fontWeight: (props: TypographyProps) => props.fontWeight || 700,
    },
    h2: {
      fontWeight: (props: TypographyProps) => props.fontWeight || 700,
    },
    h3: {
      fontWeight: (props: TypographyProps) => props.fontWeight || 700,
    },
    h4: {
      fontWeight: (props: TypographyProps) => props.fontWeight || 700,
    },
    h5: {
      fontWeight: (props: TypographyProps) => props.fontWeight || 700,
    },
    h6: {
      fontWeight: (props: TypographyProps) => props.fontWeight || 700,
    },
  });

const Typography: FC<TypographyProps> = (props) => {
  return <MuiTypography {...props} />;
};

export default withStyles(styles)(Typography);
