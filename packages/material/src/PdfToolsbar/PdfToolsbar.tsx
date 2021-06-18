import React, { forwardRef, HTMLAttributes } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import clsx from 'clsx';

export interface PdfToolsbarProps extends HTMLAttributes<HTMLDivElement> {
  pageSize?: 'A4';
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 'auto',
      textAlign: 'right',
      paddingTop: theme.spacing(4),
      width: ({ pageSize = 'A4' }: PdfToolsbarProps) => {
        switch (pageSize) {
          case 'A4':
          default:
            return 980;
        }
      },
    },
    '@media print': {
      noPrint: {
        display: 'none',
      },
    },
    noPrint: {},
  });

const PdfToolsbar = forwardRef<
  HTMLDivElement,
  PdfToolsbarProps & WithStyles<typeof styles>
>((props, ref) => {
  const { className, classes, pageSize, ...other } = props;

  return (
    <div
      ref={ref}
      className={clsx(className, classes.root, classes.noPrint)}
      {...other}
    />
  );
});

export default withStyles(styles)(PdfToolsbar);
