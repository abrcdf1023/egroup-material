import React, {
  Children,
  cloneElement,
  FC,
  ReactElement,
  useState,
  isValidElement,
} from 'react';
import { Menu, MenuProps } from '@material-ui/core';

export interface ButtonMenuProps extends Omit<MenuProps, 'open'> {
  /**
   * The button to open `Menu`.
   */
  button: ReactElement;
  /**
   * If `true`, the menu is visible.
   */
  open?: boolean;
}

const ButtonMenu: FC<ButtonMenuProps> = ({
  button,
  children,
  anchorEl: anchorElProp,
  open,
  onClose,
  ...other
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  function handleClose(e, reason) {
    setAnchorEl(null);
    if (onClose) {
      onClose(e, reason);
    }
  }

  const controledButton = cloneElement(button, {
    onClick: (e) => {
      setAnchorEl(e.currentTarget);
      if (button.props.onClick) {
        button.props.onClick(e);
      }
    },
  });

  const items = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, {
        onClick: (e) => {
          handleClose(e, 'itemClick');
          if (child.props.onClick) {
            child.props.onClick(e);
          }
        },
      });
    }
    return undefined;
  });

  return (
    <>
      {controledButton}
      <Menu
        anchorEl={anchorEl}
        open={open ?? Boolean(anchorEl)}
        onClose={handleClose}
        {...other}
      >
        {items}
      </Menu>
    </>
  );
};

export default ButtonMenu;
