import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form';
import MUITextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';

export default class TextField extends Component {
  static propTypes = {
    // redux form props
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired
  };

  render() {
    const {
      input,
      meta: { touched, error, invalid, asyncValidating },
      ...rest
    } = this.props;
    // return loading progress
    if (asyncValidating) {
      return (
        <MUITextField
          error={touched && invalid}
          helperText={touched && error}
          {...input}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            ),
            ...rest.InputProps
          }}
          {...rest}
        />
      );
    }
    return (
      <MUITextField
        error={touched && invalid}
        helperText={touched && error}
        {...input}
        {...rest}
      />
    );
  }
}
