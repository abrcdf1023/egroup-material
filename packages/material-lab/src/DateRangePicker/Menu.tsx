import React from 'react';

import { RangeMenuProps, NavigationAction, Marker } from './DateRangePicker.d';
import { addMonths } from 'date-fns';

import Month from './Month';

export const MARKERS: { [key: string]: Marker } = {
  FIRST_MONTH: Symbol('firstMonth'),
  SECOND_MONTH: Symbol('secondMonth')
};

const Menu: React.FunctionComponent<RangeMenuProps> = props => {
  const today = new Date();

  const {
    initialStartDate,
    initialEndDate,
    startDate,
    endDate,
    hoverDay,
    minDate,
    maxDate,
    handleDayClick,
    handleDayHover,
    touched
  } = props;

  const [month, setMonth] = React.useState<Date>(initialStartDate || today);

  const handleMonthNavigate = (action: NavigationAction) => {
    setMonth(addMonths(month, action));
  };

  return (
    <Month
      startDate={startDate}
      endDate={endDate}
      minDate={minDate}
      maxDate={maxDate}
      hoverDay={hoverDay}
      value={month}
      touched={touched}
      navState={[true, true]}
      setValue={setMonth}
      handleDayClick={handleDayClick}
      handleDayHover={handleDayHover}
      handleMonthNavigate={handleMonthNavigate}
    />
  );
};

export default Menu;
