import React from 'react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from './redux/configureStore';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import { Field } from 'redux-form/immutable';

import checkboxMarkdownText from './doc/checkbox.md';
import Checkbox from '../src/Checkbox';
import CheckboxField from '../src/CheckboxField';

storiesOf('Checkbox', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => (
      <Checkbox
        MUICheckboxProps={{
          variant: 'contained',
          onClick: action('clicked!')
        }}
        label="default"
      />
    ),
    {
      info: {
        text: checkboxMarkdownText,
        propTables: [Checkbox],
        propTablesExclude: [Checkbox]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const initialValues = fromJS({
        CheckboxField: true
      });
      return (
        <ReduxForm initialValues={initialValues}>
          <Field
            name="CheckboxField"
            label="checkbox with Field"
            component={CheckboxField}
            MUICheckboxProps={{
              variant: 'contained',
              onClick: action('clicked!')
            }}
          />
        </ReduxForm>
      );
    },
    {
      info: {
        text: checkboxMarkdownText,
        propTables: [CheckboxField],
        propTablesExclude: [CheckboxField]
      }
    }
  );
