import React, { forwardRef } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core';
import SwitchBase, { SwitchBaseProps } from './SwitchBase';

export type StandardSwitchProps = SwitchBaseProps;

const styles = (theme: Theme) =>
  createStyles({
    thumb: {
      border: ({ color = 'primary' }: SwitchBaseProps) =>
        color !== 'default' ? `1px solid ${theme.egPalette[color][1]}` : `none`,
    },
  });

const StandardSwitch = forwardRef<
  HTMLButtonElement,
  StandardSwitchProps & WithStyles<typeof styles>
>((props, ref) => <SwitchBase ref={ref} {...props} />);

export default withStyles(styles, { name: 'EgStandardSwitch' })(StandardSwitch);
