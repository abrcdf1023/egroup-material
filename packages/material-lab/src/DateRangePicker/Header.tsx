import React from 'react';

import { setMonth, getMonth, setYear, getYear } from 'date-fns';
import { HeaderProps } from './DateRangePicker.d';

import {
  Grid,
  createStyles,
  withStyles,
  IconButton,
  Select,
  MenuItem
} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

export const styles = createStyles({
  iconContainer: {
    padding: 5
  },
  icon: {
    padding: 10,
    '&:hover': {
      background: 'none'
    }
  }
});

const MONTHS = [
  '一月',
  '二月',
  '三月',
  '四月',
  '五月',
  '六月',
  '七月',
  '八月',
  '九月',
  '十月',
  '十一月',
  '十二月'
];

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((y, i) => relativeTo.getFullYear() - half + i);
};

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  classes,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious
}) => {
  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDate(setMonth(date, parseInt(event.target.value)));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDate(setYear(date, parseInt(event.target.value)));
  };

  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item className={classes.iconContainer}>
        <IconButton
          className={classes.icon}
          disabled={prevDisabled}
          onClick={onClickPrevious}
        >
          <ChevronLeft color={prevDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
      <Grid item>
        <Select
          value={getMonth(date)}
          onChange={handleMonthChange}
          MenuProps={{ disablePortal: true }}
        >
          {MONTHS.map((month, idx) => (
            <MenuItem key={month} value={idx}>
              {month}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        <Select
          value={getYear(date)}
          onChange={handleYearChange}
          MenuProps={{ disablePortal: true }}
        >
          {generateYears(date, 30).map(year => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item className={classes.iconContainer}>
        <IconButton
          className={classes.icon}
          disabled={nextDisabled}
          onClick={onClickNext}
        >
          <ChevronRight color={nextDisabled ? 'disabled' : 'action'} />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(Header);
