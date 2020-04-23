import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@material-ui/core';

const AlertDialog = ({
  isOpen = false,
  title,
  message,
  children,
  handleClose,
  onClose,
  onConfirm,
  MuiDialogTitleProps = {},
  MuiDialogContentTextProps = {},
  MuiDialogContentProps = {},
  MuiDialogActionsProps = {},
  MuiButtonProps = {},
  ...other
}) => {
  const handleDialogClose = (e, reason) => {
    handleClose();
    if (onClose) {
      onClose(e, reason);
    }
  };

  const handleConfirmClick = e => {
    handleClose();
    if (onConfirm) {
      onConfirm(e);
    }
  };

  return (
    <Dialog open={isOpen} onClose={handleDialogClose} {...other}>
      <DialogTitle {...MuiDialogTitleProps}>{title}</DialogTitle>
      <DialogContent {...MuiDialogContentProps}>
        {message && (
          <DialogContentText {...MuiDialogContentTextProps}>
            {message}
          </DialogContentText>
        )}
        {children}
      </DialogContent>
      <DialogActions {...MuiDialogActionsProps}>
        <Button
          onClick={handleConfirmClick}
          color="primary"
          autoFocus
          {...MuiButtonProps}
        >
          確定
        </Button>
      </DialogActions>
    </Dialog>
  );
};

AlertDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  message: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
  onConfirm: PropTypes.func,
  MuiDialogTitleProps: PropTypes.object,
  MuiDialogContentProps: PropTypes.object,
  MuiDialogContentTextProps: PropTypes.object,
  MuiDialogActionsProps: PropTypes.object,
  MuiButtonProps: PropTypes.object
};

export default AlertDialog;
