import React, { FC } from 'react';
import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form/immutable';
import RadioInputGroupField from '@e-group/material-form/immutable/RadioInputGroupField';

import { fromJS } from 'immutable';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/immutable/ReduxForm';
import { store } from '../redux/immutable/configureStore';

export const WithReduxFormImmutableField: FC = () => {
  const [values, setValues] = React.useState({
    field1: {
      value: 'radio2',
      text: 'awesome!',
    },
    field2: {
      value: 'Monday',
      text: 'awesome!',
    },
  });
  const handleChange = (values: any) => {
    setValues(values.toJS());
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm onChange={handleChange} initialValues={fromJS(values)}>
            <Field
              name="field1"
              label="with Field"
              component={RadioInputGroupField}
              helperText="please select items"
              fullWidth
              margin="normal"
              options={[
                {
                  label: 'normal radio',
                  color: 'primary',
                  value: 'radio1',
                },
                {
                  label: 'checked with text input',
                  color: 'primary',
                  value: 'radio2',
                  toggleInput: true,
                },
                {
                  label: 'checked with text input',
                  value: 'radio3',
                  toggleInput: true,
                },
              ]}
            />
            <Field
              name="field2"
              label="with Field"
              component={RadioInputGroupField}
              fullWidth
              margin="normal"
              options={[
                {
                  label: 'Monday',
                  value: 'Monday',
                },
                {
                  label: 'Tuesday',
                  value: 'Tuesday',
                },
                {
                  label: 'Wednesday',
                  value: 'Wednesday',
                },
                {
                  label: 'Thursday',
                  value: 'Thursday',
                },
                {
                  label: 'Friday',
                  value: 'Friday',
                },
                {
                  label: 'Saturday',
                  value: 'Saturday',
                },
                {
                  label: 'Sunday',
                  value: 'Sunday',
                },
              ]}
            />
            {/* Pass meta props cause the failed prop type and don't worry it's just for demo */}
            <Field
              name="field3"
              label="with Field"
              component={RadioInputGroupField}
              helperText="please select items"
              fullWidth
              margin="normal"
              options={[
                {
                  label: 'normal radio',
                  value: 'radio1',
                  color: 'primary',
                },
                {
                  label: 'checked with text input',
                  value: 'radio2',
                  color: 'primary',
                  toggleInput: true,
                },
                {
                  label: 'checked with text input',
                  value: 'radio3',
                  toggleInput: true,
                },
              ]}
              meta={{
                invalid: true,
                touched: true,
                error: 'fill in this option is required!',
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
    </Provider>
  );
};
