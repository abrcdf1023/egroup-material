import { useState } from 'react';
import { SortData } from './DataTable';

export type Options = {
  fromKey?: string;
  sizeKey?: string;
  queryKey?: string;
};

export default function useDataTable<Payload = any>(
  defaultPayload?: Payload,
  options?: Options
) {
  const { fromKey = 'from', sizeKey = 'size', queryKey = 'query' } =
    options || {};
  const [payload, setPayload] = useState<Payload>({
    [fromKey]: 0,
    [sizeKey]: 10,
    ...defaultPayload,
  } as Payload);

  const handleSearchChange = (e) => {
    setPayload((value) => ({
      ...value,
      [fromKey]: '0',
      [queryKey]: e.target.value,
    }));
  };

  const handleChangePage = (_, { page, rowsPerPage }) => {
    setPayload((value) => ({
      ...value,
      [fromKey]: page * rowsPerPage,
    }));
  };

  const handleChangeRowsPerPage = (_, { rowsPerPage }) => {
    setPayload((value) => ({
      ...value,
      [fromKey]: '0',
      [sizeKey]: rowsPerPage,
    }));
  };

  const handleColumnSortData = <RowData>(
    sortData: SortData,
    key: string,
    index: number
  ) => () => {
    sortData({
      activeOrderIndex: index,
      asc: (data) =>
        (data as RowData[]).sort((a, b) => {
          if (a[key] === b[key]) {
            return 0;
          }
          return b[key] > a[key] ? 1 : -1;
        }),
      desc: (data) =>
        (data as RowData[]).sort((a, b) => {
          if (a[key] === b[key]) {
            return 0;
          }
          return a[key] > b[key] ? 1 : -1;
        }),
    });
  };

  const page = Math.ceil(Number(payload[fromKey]) / Number(payload[sizeKey]));
  const rowsPerPage = parseInt(payload[sizeKey], 10);

  return {
    handleSearchChange,
    handleChangePage,
    handleChangeRowsPerPage,
    handleColumnSortData,
    payload,
    setPayload,
    page,
    rowsPerPage,
  };
}
