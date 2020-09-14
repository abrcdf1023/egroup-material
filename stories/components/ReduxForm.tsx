import React, { FC } from 'react';
import PropTypes from 'prop-types';
import { reduxForm, InjectedFormProps } from 'redux-form';

export const FORM = 'reduxForm';

const ReduxForm: FC<InjectedFormProps> = (props) => {
  const { handleSubmit, children } = props;
  return <form onSubmit={handleSubmit}>{children}</form>;
};

ReduxForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({ form: FORM })(ReduxForm);
