import React from 'react';
import PropTypes from 'prop-types';
import makeStyles from '@material-ui/core/styles/makeStyles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

const NestedListItem = ({
  icon: iconProp,
  items,
  MuiListItemProps,
  MuiListItemIconProps,
  MuiListItemTextProps
}) => {
  const { onClick, ...otherMuiListItemProps } = MuiListItemProps || {};
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const hasItems = items && items.length > 0;

  const handleClick = e => {
    if (!hasItems && onClick) {
      onClick(e);
    }
    if (hasItems) {
      setOpen(value => !value);
    }
  };

  const renderIcon = icon => {
    if (icon) {
      return <ListItemIcon {...MuiListItemIconProps}>{icon}</ListItemIcon>;
    }
    return undefined;
  };

  const renderExpendIcon = () => {
    if (hasItems) {
      return open ? <ExpandLess /> : <ExpandMore />;
    }
    return undefined;
  };

  const renderCollapse = () => {
    if (hasItems) {
      return (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {items.map((item, index) => {
              return (
                <ListItem
                  key={item.path}
                  className={classes.nested}
                  {...item.MuiListItemProps}
                >
                  {renderIcon(item.icon)}
                  <ListItemText {...item.MuiListItemTextProps} />
                </ListItem>
              );
            })}
          </List>
        </Collapse>
      );
    }
    return undefined;
  };

  return (
    <React.Fragment>
      <ListItem onClick={handleClick} {...otherMuiListItemProps}>
        {renderIcon(iconProp)}
        <ListItemText {...MuiListItemTextProps} />
        {renderExpendIcon()}
      </ListItem>
      {renderCollapse()}
    </React.Fragment>
  );
};

NestedListItem.propTypes = {
  /**
   * Mui `ListItem` props
   */
  MuiListItemProps: PropTypes.object,
  /**
   * Mui `ListItemText` props
   */
  MuiListItemTextProps: PropTypes.object,
  /**
   * Mui `ListItemIcon` props
   */
  MuiListItemIconProps: PropTypes.object,
  /**
   * Set icon before text.
   */
  icon: PropTypes.node,
  /**
   * If has items will auto generate nested list.
   */
  items: PropTypes.array
};

export default NestedListItem;
