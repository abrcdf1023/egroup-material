import React from 'react';
import PropTypes from 'prop-types';

import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Fade from '@material-ui/core/Fade';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const BackAppbar = React.forwardRef(function BackAppbar(props, ref) {
  const {
    history,
    location,
    displayBackButton,
    fadeIn,
    backIcon,
    children,
    MuiFadeProps,
    MuiToolbarProps,
    MuiIconButtonProps,
    ...other
  } = props;
  const [pointer, setPointer] = React.useState(0);

  React.useEffect(() => {
    setPointer(val => val + 1);
  }, [location]);

  return (
    <Fade in={fadeIn} {...MuiFadeProps} ref={ref}>
      <AppBar {...other}>
        <Toolbar {...MuiToolbarProps}>
          <Box mr={2} display={displayBackButton ? 'block' : 'none'}>
            <IconButton
              onClick={() => {
                history.go(-pointer);
              }}
              color="inherit"
              edge="start"
              {...MuiIconButtonProps}
            >
              {backIcon}
            </IconButton>
          </Box>
          {children}
        </Toolbar>
      </AppBar>
    </Fade>
  );
});

BackAppbar.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  displayBackButton: PropTypes.bool,
  fadeIn: PropTypes.bool,
  backIcon: PropTypes.node,
  children: PropTypes.node,
  MuiFadeProps: PropTypes.object,
  MuiToolbarProps: PropTypes.object,
  MuiIconButtonProps: PropTypes.object
};

BackAppbar.defaultProps = {
  displayBackButton: true,
  backIcon: <ArrowBackIcon />,
  MuiFadeProps: {},
  MuiToolbarProps: {},
  MuiIconButtonProps: {}
};

export default BackAppbar;
