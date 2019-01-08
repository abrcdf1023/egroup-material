import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Button as MUIButton, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles';

class Button extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    children: PropTypes.node.isRequired
  };

  render() {
    const {
      classes,
      className,
      loading,
      fullWidth,
      children,
      style,
      ...rest
    } = this.props;
    return (
      <div
        className={classnames(classes.root, className)}
        style={{ width: fullWidth ? '100%' : 'auto', ...style }}
      >
        <div className={classes.wrapper}>
          <MUIButton fullWidth={fullWidth} disabled={loading} {...rest}>
            {children}
          </MUIButton>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Button);
