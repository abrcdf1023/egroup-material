import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Field } from 'redux-form';
import TextLoading, { TextLoadingProps } from '@e-group/material/TextLoading';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextLoadingField from '@e-group/material-form/TextLoadingField';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/ReduxForm';
import { store } from '../redux/configureStore';

export * from './TextLoadingFormik.stories';
export * from './TextLoadingImmutable.stories';

export default {
  title: 'Components/TextLoading',
  component: TextLoading,
} as Meta;

export const Default: FC = () => (
  <TextLoading
    loading
    label="default"
    helperText="account is validating..."
    margin="normal"
    required
  />
);

export const WithCustomizedLoadingAdornment: FC = () => (
  <TextLoading
    label="with customized loadingAdornment"
    loading
    loadingAdornment={
      <InputAdornment position="end">
        <CircularProgress color="secondary" size={20} />
      </InputAdornment>
    }
    helperText="If set loading=`true` the endAdornment will be replaced by loadingAdornment"
    margin="normal"
    InputProps={{
      endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
    }}
    required
  />
);

export const WithSelect: FC = () => {
  const [value, setValue] = React.useState('option1');
  const handleChange: TextLoadingProps['onChange'] = (e) => {
    setValue(e.target.value);
  };
  return (
    <TextLoading
      label="with Select"
      loading
      value={value}
      select
      margin="normal"
      onChange={handleChange}
      InputProps={{
        startAdornment: <InputAdornment position="start">Kg</InputAdornment>,
      }}
      required
    >
      <MenuItem value="option1">option1</MenuItem>
      <MenuItem value="option2">option2</MenuItem>
    </TextLoading>
  );
};

export const WithReduxFormField: FC = () => {
  const [values, setValues] = React.useState({
    field1: 'admin@gmail.com',
  });
  const handleChange = (values: any) => {
    setValues(values);
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm onChange={handleChange} initialValues={values}>
            <Field
              label="default"
              name="field1"
              margin="normal"
              component={TextLoadingField}
              fullWidth
            />
            {/* Pass meta props cause the failed prop type and don't worry it's just for demo */}
            <Field
              label="loading"
              name="field2"
              margin="normal"
              component={TextLoadingField}
              fullWidth
              meta={{ asyncValidating: true }}
            />
            {/* Pass meta props cause the failed prop type and don't worry it's just for demo */}
            <Field
              label="error"
              name="field3"
              margin="normal"
              required
              component={TextLoadingField}
              fullWidth
              meta={{
                invalid: true,
                touched: true,
                error: 'error message',
              }}
            />
            <Field
              label="select"
              name="field4"
              fullWidth
              loading
              component={TextLoadingField}
              select
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Kg</InputAdornment>
                ),
              }}
              required
            >
              <MenuItem value="option1">option1</MenuItem>
              <MenuItem value="option2">option2</MenuItem>
            </Field>
            <Field
              label="multiple select"
              name="field5"
              SelectProps={{
                multiple: true,
              }}
              fullWidth
              loading
              component={TextLoadingField}
              select
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Kg</InputAdornment>
                ),
              }}
              required
            >
              <MenuItem value="option1">option1</MenuItem>
              <MenuItem value="option2">option2</MenuItem>
            </Field>
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
