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
  icon,
  items,
  MuiListItemProps,
  MuiListItemIconProps,
  MuiListItemTextProps
}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClick = () => setOpen(value => !value);

  const renderIcon = () => {
    if (icon) {
      return <ListItemIcon {...MuiListItemIconProps}>{icon}</ListItemIcon>;
    }
    return undefined;
  };

  const renderExpendIcon = () => {
    if (items && items.length > 0) {
      return open ? <ExpandLess /> : <ExpandMore />;
    }
    return undefined;
  };

  const renderCollapse = () => {
    if (items && items.length > 0) {
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
      <ListItem onClick={handleClick} {...MuiListItemProps}>
        {renderIcon()}
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
