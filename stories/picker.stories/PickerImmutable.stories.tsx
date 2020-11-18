import React from 'react';

import { fromJS } from '@e-group/immutable';
import DateFnsUtils from '@date-io/date-fns';

import { Provider } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import PickerField from '@e-group/material-form/PickerField';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import { Meta } from '@storybook/react';
import Picker from '@e-group/material-module/Picker';
import { store } from '../redux/immutable/configureStore';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/immutable/ReduxForm';

export default {
  title: 'Components/Picker',
  component: Picker,
} as Meta;

export const WithReduxFormImmutableField = () => {
  const [values, setValues] = React.useState(
    fromJS({
      field1: null,
      field2: new Date(),
      field3: new Date(),
      field4: null,
      field5: new Date(),
      field6: new Date(),
      field7: new Date(),
    })
  );
  const handleChange = (values: any) => {
    setValues(values);
  };
  return (
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container>
          <Grid item xs={6}>
            <ReduxForm onChange={handleChange} initialValues={values}>
              <Field
                label="date picker"
                name="field1"
                margin="normal"
                pickerFormat="yyyy-MM-dd"
                component={PickerField}
                fullWidth
                okLabel="確認"
                cancelLabel="取消"
              />
              <Field
                label="keyboard date picker"
                name="field2"
                margin="normal"
                component={PickerField}
                picker="keyboardDate"
                pickerFormat="yyyy-MM-dd"
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
                pickerFormat="yyyy/MM/dd HH:mm"
              />
              <Field
                label="Year only"
                name="field7"
                views={['year']}
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
      </MuiPickersUtilsProvider>
    </Provider>
  );
};
