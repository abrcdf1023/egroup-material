import React from 'react';
import PropTypes from 'prop-types';

import { Field } from 'redux-form/immutable';
import TextLoadingField from '@e-group/material-form/TextLoadingField';
import RadioGroupField from '@e-group/material-form/RadioGroupField';
import CheckboxInputGroupField from '@e-group/material-form/CheckboxInputGroupField';
import CheckboxField from '@e-group/material-form/CheckboxField';

/**
 * A simple React component capable of building HTML forms out of a JSON schema and using material ui by default.
 * To understand json schema https://json-schema.org/learn/getting-started-step-by-step.html.
 * @param {*} param0
 */
const SchemaFields = ({ schema, renderField }) => {
  const { required, properties } = schema;

  const oneIsRequired = React.useCallback(
    value => (!value ? 'Required field' : undefined),
    []
  );
  const textIsRequired = React.useCallback(
    value => (!value ? 'Required field' : undefined),
    []
  );
  const atLeastOneIsRequired = React.useCallback(value => {
    const msg = 'Need to select at least one option';
    if (!value) {
      return msg;
    }
    const checks = value.filter(el => el.get('checked'));
    if (checks.size === 0) {
      return msg;
    }
    return undefined;
  }, []);

  const generateField = (field, key) => {
    const { type, ...fieldOptions } = field;
    const hasRequired = required.indexOf(key) > -1;
    let fieldProps = {
      ...fieldOptions,
      required: hasRequired
    };

    switch (field.type) {
      case 'rating':
      case 'choiceone':
        fieldProps = {
          ...fieldProps,
          component: RadioGroupField,
          validate: hasRequired ? oneIsRequired : undefined
        };
        break;
      case 'choicemulti':
        fieldProps = {
          ...fieldProps,
          component: CheckboxInputGroupField,
          validate: hasRequired ? atLeastOneIsRequired : undefined
        };
        break;
      case 'text':
        fieldProps = {
          ...fieldProps,
          component: TextLoadingField,
          validate: hasRequired ? textIsRequired : undefined
        };
        break;
      case 'boolean':
        fieldProps = {
          ...fieldProps,
          component: CheckboxField
        };
        break;
      default:
        break;
    }
    if (renderField) {
      return renderField(fieldProps);
    }
    return <Field key={fieldProps.name} {...fieldProps} />;
  };

  return Object.keys(properties).map(key =>
    generateField(properties[key], key)
  );
};

// TODO: Need use coustomized proptype to fixed it.
// const fieldPropType = PropTypes.shape({
//   type: PropTypes.oneOf([
//     'rating',
//     'choiceone',
//     'choicemulti',
//     'text',
//     'boolean'
//   ]).isRequired,
//   name: PropTypes.string.isRequired,
//   label: PropTypes.string,
//   required: PropTypes.bool,
//   options: PropTypes.array
// });

SchemaFields.propTypes = {
  schema: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.oneOf([
      'null',
      'boolean',
      'object',
      'array',
      'number',
      'string'
    ]).isRequired,
    required: PropTypes.arrayOf(PropTypes.string),
    properties: PropTypes.object.isRequired
  }).isRequired,
  renderField: PropTypes.func
};

export default SchemaFields;
