import React, { FC } from 'react';

import { Meta } from '@storybook/react';

import { Provider } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Fields, FieldArray } from 'redux-form';
import SimpleAddressFields from '@e-group/material-form/SimpleAddressFields';
import Highlight from '../components/Highlight';
import ReduxForm from '../components/ReduxForm';
import { store } from '../redux/configureStore';

export * from './SimpleAddressImmutable.stories';

export default {
  title: 'Components/SimpleAddressFields',
  component: SimpleAddressFields,
} as Meta;

const renderList = ({ fields }) => {
  return fields.map((field, index) => (
    <div key={index}>
      <Fields
        names={[`${field}.city`, `${field}.area`, `${field}.postalCode`]}
        component={SimpleAddressFields}
      />
    </div>
  ));
};

export const Default: FC = () => {
  const [values, setValues] = React.useState({
    city: '基隆市',
    area: '三重',
    postalCode: '100',
    addressList: [
      {
        city: '基隆市',
        area: '三重',
        postalCode: '100',
      },
      {
        city: '基隆市',
        area: '三重',
        postalCode: '100',
      },
      {
        city: '基隆市',
        area: '三重',
        postalCode: '100',
      },
    ],
  });
  const handleChange = (values) => {
    setValues(values);
  };
  return (
    <Provider store={store}>
      <Grid container>
        <Grid item xs={6}>
          <ReduxForm onChange={handleChange} initialValues={values}>
            <Typography variant="h6">default</Typography>
            <Fields
              names={['city', 'area', 'postalCode']}
              component={SimpleAddressFields}
            />
            <Fields
              names={['city', 'area', 'postalCode']}
              component={SimpleAddressFields}
              MuiTextFieldProps={{
                helperText: 'TEST',
                label: 'TEST',
                style: {
                  minWidth: 120,
                },
              }}
              cityProps={{
                label: '戶籍縣市',
                helperText: '縣市',
              }}
              areaProps={{
                label: '戶籍地區',
                helperText: '地區',
              }}
              postalCodeProps={{
                label: '郵遞區號',
              }}
            />
            <Fields
              names={['city', 'area', 'postalCode']}
              MuiTextFieldProps={{
                fullWidth: true,
                margin: 'normal',
              }}
              cityProps={{
                label: '縣市',
              }}
              areaProps={{
                label: '地區',
              }}
              postalCodeProps={{
                label: '郵遞區號',
              }}
              component={SimpleAddressFields}
              render={(field1: any, field2: any, field3: any) => (
                <Grid container>
                  <Grid item xs={12}>
                    {field1}
                  </Grid>
                  <Grid item xs={12}>
                    {field2}
                  </Grid>
                  <Grid item xs={12}>
                    {field3}
                  </Grid>
                </Grid>
              )}
            />
            <Typography variant="h6">without postalCode</Typography>
            <Fields names={['city', 'area']} component={SimpleAddressFields} />
            <Fields
              names={['city', 'area']}
              component={SimpleAddressFields}
              render={(field1: any, field2: any, field3: any) => (
                <Grid container>
                  <Grid item xs={12}>
                    {field1}
                  </Grid>
                  <Grid item xs={12}>
                    {field2}
                  </Grid>
                  <Grid item xs={12}>
                    {field3}
                  </Grid>
                </Grid>
              )}
            />
            <Typography variant="h6">with nest Fields</Typography>
            <FieldArray name="addressList" component={renderList} />
            <Typography variant="h6">with Error</Typography>
            <Fields
              names={['city', 'area', 'postalCode']}
              MuiTextFieldProps={{
                fullWidth: true,
                margin: 'normal',
              }}
              cityProps={{
                label: '縣市',
              }}
              areaProps={{
                label: '地區',
              }}
              postalCodeProps={{
                label: '郵遞區號',
              }}
              component={SimpleAddressFields}
              /* Pass props to test error status */
              city={{
                input: {
                  value: '',
                  onChange: () => {},
                },
                meta: {
                  invalid: true,
                  touched: true,
                  error: 'city error message',
                },
              }}
              area={{
                input: {
                  value: '',
                  onChange: () => {},
                },
                meta: {
                  invalid: true,
                  touched: true,
                  error: 'area error message',
                },
              }}
              postalCode={{
                input: {
                  value: '',
                  onChange: () => {},
                },
                meta: {
                  invalid: true,
                  touched: true,
                  error: 'postalCode error message',
                },
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
