import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { withStyles } from '@material-ui/core';
import {
  List,
  ListItem,
  Divider,
  Table,
  TableFooter,
  TableRow,
  TablePagination
} from '@material-ui/core';
import Loader from '../../Loader';

const styles = theme => ({
  loader: {
    paddingTop: theme.spacing.unit * 5
  }
});

const DataList = ({
  classes,
  serverSide,
  loading,
  isEmpty,
  showDivider,
  columns,
  data: dataProp,
  renderColumn,
  renderDataRow,
  renderEmpty,
  TablePaginationProps,
  ...other
}) => {
  const {
    page: pageProp,
    rowsPerPage: rowsPerPageProp,
    onChangePage,
    onChangeRowsPerPage,
    ...otherTablePaginationProps
  } = TablePaginationProps || {};
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState(dataProp);
  const [order, setOrder] = React.useState('desc');
  const [orderIndex, setOrderIndex] = React.useState();

  // Define if user need control `page` and `rowsPerPage` attribute.
  const isPageControlled = typeof pageProp === 'undefined';
  const isRowsPerPageControlled = typeof rowsPerPageProp === 'undefined';

  React.useEffect(() => {
    setData(dataProp);
  }, [dataProp]);

  function handleChangePage(event, newPage) {
    if (isPageControlled) {
      setPage(newPage);
    }
    // To solve when load data from server not sort it instantly.
    if (serverSide) {
      setOrderIndex();
    }
    if (onChangePage) {
      onChangePage(event, {
        page: newPage,
        rowsPerPage: rowsPerPage
      });
    }
  }

  function handleChangeRowsPerPage(event) {
    if (isRowsPerPageControlled) {
      setRowsPerPage(event.target.value);
    }
    // To solve when load data from server not sort it instantly.
    if (serverSide) {
      setOrderIndex();
    }
    if (onChangeRowsPerPage) {
      onChangeRowsPerPage(event, {
        page: page,
        rowsPerPage: event.target.value
      });
    }
  }

  const makeSortData = index => ({ asc, desc }) => {
    if (order === 'desc') {
      setOrder('asc');
      setData(asc(data));
    } else {
      setOrder('desc');
      setData(desc(data));
    }
    setOrderIndex(index);
  };

  const renderBody = () => {
    if (serverSide && loading) {
      return <Loader className={classes.loader} />;
    }
    if (isEmpty) {
      if (renderEmpty) return renderEmpty();
      return <ListItem>Data not found.</ListItem>;
    }
    if (serverSide) {
      return data.map(renderDataRow);
    } else {
      return data
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map(renderDataRow);
    }
  };

  return (
    <React.Fragment>
      <List {...other}>
        {columns.map((rowData, index) =>
          renderColumn(rowData, index, {
            sortData: makeSortData(index),
            orderIndex,
            order
          })
        )}
        {showDivider && <Divider />}
        {renderBody()}
      </List>
      <Table>
        <TableFooter>
          <TableRow>
            <TablePagination
              page={isPageControlled ? page : pageProp}
              rowsPerPage={
                isRowsPerPageControlled ? rowsPerPage : rowsPerPageProp
              }
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              {...otherTablePaginationProps}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </React.Fragment>
  );
};

DataList.propTypes = {
  /**
   * Override or extend the styles applied to the component.
   */
  classes: PropTypes.object.isRequired,
  /**
   * Columns is used to pass in renderColumn.
   */
  columns: ImmutablePropTypes.list.isRequired,
  /**
   * Data is used to pass in renderDataRow.
   */
  data: ImmutablePropTypes.list.isRequired,
  /**
   * Use columns prop to render columns you want.
   */
  renderColumn: PropTypes.func.isRequired,
  /**
   * Use data prop to render rows you want.
   */
  renderDataRow: PropTypes.func.isRequired,
  /**
   * Provide a function to customized empty state.
   */
  renderEmpty: PropTypes.func,
  /**
   * If data is get from server set this to true.
   */
  serverSide: PropTypes.bool,
  /**
   * Toggle `Loader` and this only work with `serverSide`.
   */
  loading: PropTypes.bool,
  /**
   * If `true` show empty state.
   */
  isEmpty: PropTypes.bool,
  /**
   * If `true` show Divider default is `true`.
   */
  showDivider: PropTypes.bool,
  /**
   * Mui TablePagination props.
   */
  TablePaginationProps: PropTypes.object
};

DataList.defaultProps = {
  showDivider: true
};

export default withStyles(styles)(DataList);
