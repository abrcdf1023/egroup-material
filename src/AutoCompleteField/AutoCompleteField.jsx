import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes } from 'redux-form';
import AutoComplete from '../AutoComplete';

export default class AutoCompleteField extends Component {
  static propTypes = {
    // redux form props
    input: PropTypes.shape(fieldInputPropTypes),
    /** Callback function that triggers when the search text value has changed.
     * function(option: object) => void */
    onChange: PropTypes.func
  };

  handleChange = option => {
    const { onChange, input } = this.props;
    if (onChange) {
      onChange(option, this.props);
    } else {
      input.onChange(option);
    }
  };

  render() {
    const { input, label, ...rest } = this.props;
    return (
      <AutoComplete
        onChange={this.handleChange}
        value={input.value}
        {...rest}
      />
    );
  }
}
