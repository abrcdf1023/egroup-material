import React from 'react';
import { storiesOf } from '@storybook/react';

import { store } from '../redux/configureStore';
import { store as immutableJsStore } from '../redux/immutable/configureStore';
import { fromJS } from 'immutable';
import MomentUtils from '@date-io/moment';

import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import PickerField from '@e-group/material-form/PickerField';
import Grid from '@material-ui/core/Grid';
import { Field as ImmutableJsField } from 'redux-form/immutable';
import Highlight from '../components/Highlight';
import ImmutableJsReduxForm from '../components/immutable/ReduxForm';
import { Field } from 'redux-form';
import ReduxForm from '../components/ReduxForm';

storiesOf('Picker', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .addDecorator(story => (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {story()}
    </MuiPickersUtilsProvider>
  ))
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          field1: new Date(),
          field2: new Date(),
          field3: new Date(),
          field4: new Date(),
          field5: new Date(),
          field6: new Date(),
          field7: new Date(),
        });
        const handleChange = values => {
          setValues(values);
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={values}>
                <Field
                  label="date picker"
                  name="field1"
                  margin="normal"
                  pickerFormat="YYYY-MM-DD"
                  component={PickerField}
                  fullWidth
                />
                <Field
                  label="keyboard date picker"
                  name="field2"
                  margin="normal"
                  component={PickerField}
                  picker="keyboardDate"
                  pickerFormat="YYYY-MM-DD"
                  fullWidth
                />
                <Field
                  label="time picker"
                  name="field3"
                  margin="normal"
                  component={PickerField}
                  picker="time"
                  fullWidth
                />
                <Field
                  label="keyboard time picker"
                  name="field4"
                  margin="normal"
                  component={PickerField}
                  picker="keyboardTime"
                  mask="__:__ _M"
                  fullWidth
                />
                <Field
                  label="datetime picker"
                  name="field5"
                  margin="normal"
                  component={PickerField}
                  picker="dateTime"
                  fullWidth
                />
                <Field
                  label="keyboard datetime picker"
                  name="field6"
                  ampm={false}
                  variant="inline"
                  margin="normal"
                  component={PickerField}
                  picker="keyboardDateTime"
                  fullWidth
                  pickerFormat="YYYY/MM/DD HH:mm"
                />
                <Field
                  label="Year only"
                  name="field7"
                  views={["year"]}
                  variant="inline"
                  margin="normal"
                  component={PickerField}
                  fullWidth
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
      info: {
        propTables: [PickerField]
      }
    }
  )

storiesOf('Picker', module)
  .addDecorator(story => <Provider store={immutableJsStore}>{story()}</Provider>)
  .addDecorator(story => (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {story()}
    </MuiPickersUtilsProvider>
  ))
  .add(
    'with immutableJS Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState(fromJS({
          field1: new Date(),
          field2: new Date(),
          field3: new Date(),
          field4: new Date(),
          field5: new Date(),
          field6: new Date(),
          field7: new Date(),
        }));
        const handleChange = values => {
          setValues(values);
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ImmutableJsReduxForm onChange={handleChange} initialValues={values}>
                <ImmutableJsField
                  label="date picker"
                  name="field1"
                  margin="normal"
                  pickerFormat="YYYY-MM-DD"
                  component={PickerField}
                  fullWidth
                />
                <ImmutableJsField
                  label="keyboard date picker"
                  name="field2"
                  margin="normal"
                  component={PickerField}
                  picker="keyboardDate"
                  pickerFormat="YYYY-MM-DD"
                  fullWidth
                />
                <ImmutableJsField
                  label="time picker"
                  name="field3"
                  margin="normal"
                  component={PickerField}
                  picker="time"
                  fullWidth
                />
                <ImmutableJsField
                  label="keyboard time picker"
                  name="field4"
                  margin="normal"
                  component={PickerField}
                  picker="keyboardTime"
                  mask="__:__ _M"
                  fullWidth
                />
                <ImmutableJsField
                  label="datetime picker"
                  name="field5"
                  margin="normal"
                  component={PickerField}
                  picker="dateTime"
                  fullWidth
                />
                <ImmutableJsField
                  label="keyboard datetime picker"
                  name="field6"
                  ampm={false}
                  variant="inline"
                  margin="normal"
                  component={PickerField}
                  picker="keyboardDateTime"
                  fullWidth
                  pickerFormat="YYYY/MM/DD HH:mm"
                />
                <ImmutableJsField
                  label="Year only"
                  name="field7"
                  views={["year"]}
                  variant="inline"
                  margin="normal"
                  component={PickerField}
                  fullWidth
                />
              </ImmutableJsReduxForm>
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
      info: {
        propTables: [PickerField]
      }
    }
  )