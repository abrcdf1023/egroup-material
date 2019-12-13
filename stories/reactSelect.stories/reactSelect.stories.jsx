import React from 'react';

import { fromJS } from 'immutable';
import { storiesOf } from '@storybook/react';
import { boolean, select } from '@storybook/addon-knobs';
import reactSelectMarkdownText from './reactSelect.md';

import { Provider } from 'react-redux';
import ReactSelect from '@e-group/material-module/ReactSelect';
import ReactSelectField from '@e-group/material-form/ReactSelectField';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import { store } from '../redux/configureStore';
import ReduxForm from '../components/ReduxForm';
import Highlight from '../components/Highlight';
import Option from './Option'

storiesOf('ReactSelect', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => {
      const variant = select('Variant', {
        standard: 'standard',
        filled: "filled",
        outlined: "outlined",
      }, 'standard');

      return (
        <React.Fragment>
          <ReactSelect
            isClearable
            MuiTextFieldProps={{
              label: 'Single Select',
              fullWidth: boolean('FullWidth', true),
              InputProps: {
                disableUnderline: boolean('DisableUnderline', false)
              },
              variant
            }}
            placeholder="Placeholder"
            options={[{
              label: 'I am label',
              value: 'value',
            }]}
          />
          <ReactSelect
            isClearable
            variant="creatable"
            MuiTextFieldProps={{
              label: 'Creatable Select',
              fullWidth: boolean('FullWidth', true),
              InputProps: {
                disableUnderline: boolean('DisableUnderline', false)
              },
              variant
            }}
            placeholder="Placeholder"
            options={[{
              label: 'I am label',
              value: 'value',
            }]}
          />
        </React.Fragment>
      )},
    {
      notes: reactSelectMarkdownText,
      info: {
        propTables: [ReactSelect]
      }
    }
  )
  .add(
    'with multi select',
    () => {
      const variant = select('Variant', {
        standard: 'standard',
        filled: "filled",
        outlined: "outlined",
      }, 'standard');

      return (
        <React.Fragment>
          <ReactSelect
            MuiTextFieldProps={{
              label: 'Multi Select',
              fullWidth: boolean('FullWidth', true),
              InputProps: {
                disableUnderline: boolean('DisableUnderline', false)
              },
              variant
            }}
            isMulti
            options={[{
              label: 'label',
              value: 'value2',
            },{
              label: 'label2',
              value: 'value3',
            },{
              label: 'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo text',
              value: 'value4',
            },{
              label: 'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo text',
              value: 'value5',
            }]}
          />
          <ReactSelect
            variant="creatable"
            MuiTextFieldProps={{
              label: 'Creatable Multi Select',
              fullWidth: boolean('FullWidth', true),
              InputProps: {
                disableUnderline: boolean('DisableUnderline', false)
              },
              variant
            }}
            isMulti
            options={[{
              label: 'label',
              value: 'value2',
            },{
              label: 'label2',
              value: 'value3',
            },{
              label: 'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo text',
              value: 'value4',
            },{
              label: 'loooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo text',
              value: 'value5',
            }]}
          />
        </React.Fragment>
      )
    },
    {
      notes: reactSelectMarkdownText,
      info: {
        propTables: [ReactSelect]
      }
    }
  )
  .add(
    'with default value',
    () => {
      const variant = select('Variant', {
        standard: 'standard',
        filled: "filled",
        outlined: "outlined",
      }, 'standard');

      return (
        <React.Fragment>
          <ReactSelect
            MuiTextFieldProps={{
              label: 'Single Select',
              fullWidth: boolean('FullWidth', true),
              InputProps: {
                disableUnderline: boolean('DisableUnderline', false)
              },
              margin: 'normal',
              variant
            }}
            value={{
              label: 'I am label',
              value: 'value',
            }}
          />
          <ReactSelect
            MuiTextFieldProps={{
              label: 'Multi Select',
              fullWidth: boolean('FullWidth', true),
              InputProps: {
                disableUnderline: boolean('DisableUnderline', false)
              },
              variant
            }}
            isMulti
            value={[{
              label: 'label4',
              value: 'value2',
            },{
              label: 'label5',
              value: 'value3',
            }]}
          />
        </React.Fragment>
      )
    },
    {
      notes: reactSelectMarkdownText,
      info: {
        propTables: [ReactSelect]
      }
    }
  )
  .add(
    'with customized Option',
    () => (
      <ReactSelect
        MuiTextFieldProps={{
          fullWidth: boolean('FullWidth', true),
          InputProps: {
            disableUnderline: boolean('DisableUnderline', false)
          }
        }}
        options={[{
          userName: 'userName',
          userOrganizationName: 'userOrganizationName',
          userPhone: 'userPhone',
          label: 'userName'
        }]}
        components={{
          Option
        }}
      />
    ),
    {
      notes: reactSelectMarkdownText,
      info: {
        propTables: [ReactSelect]
      }
    }
  )
  .add(
    'with field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: {
            label: 'I am label',
            value: 'value',
          },
          field2: {
            label: 'I am label',
            value: 'value',
          },
          field3: [{
            label: 'label4',
            value: 'value2',
          },{
            label: 'label5',
            value: 'value3',
          }],
          field4: [{
            label: 'label4',
            value: 'value2',
          },{
            label: 'label5',
            value: 'value3',
          }]
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
                  component={ReactSelectField}
                  options={[{
                    label: 'label',
                    value: 'value2',
                  }]}
                  isClearable
                  MuiTextFieldProps={{
                    label: 'Single Select',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    },
                    margin: 'normal',
                  }}
                />
                <Field
                  variant="creatable"
                  name="field2"
                  label="with Field"
                  component={ReactSelectField}
                  options={[{
                    label: 'label',
                    value: 'value2',
                  }]}
                  isClearable
                  MuiTextFieldProps={{
                    label: 'Creatable Single Select',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    },
                    margin: 'normal',
                  }}
                />
                <Field
                  name="field3"
                  label="with Field"
                  component={ReactSelectField}
                  options={[{
                    label: 'label',
                    value: 'value2',
                  },{
                    label: 'label2',
                    value: 'value3',
                  },{
                    label: 'label3',
                    value: 'value4',
                  },{
                    label: 'label4',
                    value: 'value5',
                  },{
                    label: 'label5',
                    value: 'value6',
                  }]}
                  isClearable
                  isMulti
                  MuiTextFieldProps={{
                    label: 'Multi Select',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    }
                  }}
                />
                <Field
                  variant="creatable"
                  name="field4"
                  label="with Field"
                  component={ReactSelectField}
                  options={[{
                    label: 'label',
                    value: 'value2',
                  },{
                    label: 'label2',
                    value: 'value3',
                  },{
                    label: 'label3',
                    value: 'value4',
                  },{
                    label: 'label4',
                    value: 'value5',
                  },{
                    label: 'label5',
                    value: 'value6',
                  }]}
                  isClearable
                  isMulti
                  MuiTextFieldProps={{
                    label: 'Creatable Multi Select',
                    fullWidth: boolean('FullWidth', true),
                    InputProps: {
                      disableUnderline: boolean('DisableUnderline', false)
                    }
                  }}
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
      notes: reactSelectMarkdownText,
      info: {
        propTables: [ReactSelect]
      }
    }
  )
