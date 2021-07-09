import React, { FC } from 'react';
import Select, { Props, OptionTypeBase } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import {
  makeStyles,
  emphasize,
  useTheme,
  TextFieldProps,
} from '@material-ui/core';
import muiComponents from './components';

export interface OptionType extends OptionTypeBase {
  value: string;
  label: string;
}
export interface ReactSelectProps extends Props<OptionType, boolean> {
  /**
   * Mui `TextField` props.
   */
  MuiTextFieldProps?: TextFieldProps;
  /**
   * The variant to use.
   */
  variant?: 'normal' | 'creatable';
}

export const useStyles = makeStyles((theme) => ({
  input: {
    display: 'flex',
  },
  single: {
    height: 19,
  },
  multi: {
    height: 'auto',
  },
  multiStandard: {
    padding: 0,
  },
  multiFilled: {
    paddingTop: theme.spacing(2.5),
    paddingBottom: 0,
  },
  multiOutlined: {
    paddingTop: 9,
    paddingBottom: 7,
  },
  valueContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    flexWrap: 'wrap',
    '& > div': {
      padding: 0,
    },
  },
  chip: {
    margin: theme.spacing(1, 0.25),
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  indicator: {
    cursor: 'pointer',
  },
  separator: {
    alignSelf: 'center',
    backgroundColor: 'hsl(0,0%,80%)',
    width: 1,
    height: theme.spacing(2),
  },
}));

const ReactSelect: FC<ReactSelectProps> = (props) => {
  const { components, variant = 'normal', ...other } = props;
  const classes = useStyles(props);
  const theme = useTheme();

  // To fixed input text color in type=dark
  const selectStyles = {
    input: (provided: any) => ({
      ...provided,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      transition: theme.transitions.create('box-shadow'),
      boxShadow: theme.shadows[1],
      borderRadius: theme.shape.borderRadius,
      border: `1px solid ${theme.palette.divider}`,
    }),
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: theme.zIndex.modal,
    }),
  };

  const selectProps = {
    classes,
    styles: selectStyles,
    components: {
      ...muiComponents,
      ...components,
    },
    ...other
  }

  if (variant === 'creatable') {
    return (
      <CreatableSelect {...selectProps} />
    );
  }

  return (
    <Select {...selectProps} />
  );
}

export default ReactSelect;
