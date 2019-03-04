import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MUIDataTable from 'mui-datatables';

import Loader from '../Loader';

const DataTable = ({
  loading,
  options: { onTableChange, ...otherOptions },
  ...other
}) => {
  // TODO: Fixed bug https://github.com/gregnb/mui-datatables/issues/267.
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleTableChange = (action, tableState) => {
    const { options } = this.props;
    if (action === 'changeRowsPerPage') {
      setRowsPerPage(tableState.rowsPerPage);
    }
    if (options && options.onTableChange) {
      options.onTableChange(action, tableState);
    }
  };

  if (loading) return <Loader />;
  return (
    <MUIDataTable
      options={{
        onTableChange: handleTableChange,
        rowsPerPage,
        ...otherOptions
      }}
      {...other}
    />
  );
};

DataTable.propTypes = {
  // customized props
  loading: PropTypes.bool
};

export default DataTable;
