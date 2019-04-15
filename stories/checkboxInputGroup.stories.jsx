import React from 'react';
import { Provider } from 'react-redux';
import ReduxForm from './components/ReduxForm';
import Highlight from './components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import CheckboxInputGroup from '../src/CheckboxInputGroup';
import CheckboxInputGroupField from '../src/CheckboxInputGroupField';

import { fromJS } from 'immutable';
import { store } from './redux/configureStore';
import { storiesOf } from '@storybook/react';
import checkboxInputGroupText from './doc/checkboxInputGroup.md';

storiesOf('CheckboxInputGroup', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => (
      <CheckboxInputGroup
        label="default"
        options={[
          {
            name: 'checkbox1',
            label: 'normal checkbox',
            MuiCheckboxProps: {
              color: 'primary'
            }
          },
          {
            name: 'checkbox2',
            label: 'checked with text input',
            MuiCheckboxProps: {
              color: 'primary'
            },
            toggleInput: true
          },
          {
            name: 'checkbox3',
            label: 'checked with text input',
            toggleInput: true
          }
        ]}
        margin="normal"
        fullWidth
        required
      />
    ),
    {
      notes: checkboxInputGroupText,
      info: {
        propTables: [CheckboxInputGroup],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with error helperText',
    () => (
      <CheckboxInputGroup
        label="with error"
        options={[
          {
            name: 'checkbox1',
            label: 'normal checkbox',
            MuiCheckboxProps: {
              color: 'primary'
            }
          },
          {
            name: 'checkbox2',
            label: 'checked with text input',
            MuiCheckboxProps: {
              color: 'primary'
            },
            toggleInput: true
          },
          {
            name: 'checkbox3',
            label: 'checked with text input',
            toggleInput: true
          }
        ]}
        margin="normal"
        fullWidth
        required
        showHelperText
        error
        helperText="helperText"
      />
    ),
    {
      notes: checkboxInputGroupText,
      info: {
        propTables: [CheckboxInputGroup],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: {
            checkbox2: {
              checked: true,
              text: 'awesome!'
            }
          }
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <Field
                  name="field1"
                  label="with Field"
                  component={CheckboxInputGroupField}
                  options={[
                    {
                      name: 'checkbox1',
                      label: 'normal checkbox',
                      MuiCheckboxProps: {
                        color: 'primary'
                      }
                    },
                    {
                      name: 'checkbox2',
                      label: 'checked with text input',
                      MuiCheckboxProps: {
                        color: 'primary'
                      },
                      toggleInput: true
                    },
                    {
                      name: 'checkbox3',
                      label: 'checked with text input',
                      toggleInput: true
                    }
                  ]}
                />
              </ReduxForm>
            </Grid>
            <Grid item xs={6}>
              <Highlight
                code={JSON.stringify(values, null, 4)}
                type="language-json"
              />
            </Grid>
          </Grid>
        );
      };
      return <Form />;
    },
    {
      notes: checkboxInputGroupText,
      info: {
        propTables: [CheckboxInputGroup],
        propTablesExclude: [Provider]
      }
    }
  );
