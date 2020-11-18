import React from 'react';
import PropTypes from 'prop-types';
import { fromJS, isImmutable } from '@e-group/immutable';

import RadioInput from '@e-group/material/RadioInput';

const RadioInputField = ({
  radioValue,
  input: { value, onChange },
  meta,
  MuiInputProps,
  ...other
}) => {
  const valueIsImmutable = isImmutable(value);
  const { onChange: inputOnChange, value: inputValue, ...otherMuiInputProps } =
    MuiInputProps || {};

  const handleChange = (e) => {
    if (valueIsImmutable) {
      onChange(value.set('value', e.target.value));
    } else {
      onChange(
        fromJS({
          value: e.target.value,
        })
      );
    }
  };

  const handleInputChange = (e) => {
    if (valueIsImmutable) {
      onChange(value.set('text', e.target.value));
    } else {
      onChange(
        fromJS({
          text: e.target.value,
        })
      );
    }
  };

  return (
    <RadioInput
      onChange={handleChange}
      value={radioValue}
      checked={valueIsImmutable ? radioValue === value.get('value') : false}
      MuiInputProps={{
        onChange: handleInputChange,
        value: valueIsImmutable ? value.get('text', '') : '',
        ...otherMuiInputProps,
      }}
      {...other}
    />
  );
};

RadioInputField.propTypes = {
  /**
   * redux from props
   */
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default RadioInputField;
