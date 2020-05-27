import React from 'react';

import { storiesOf } from '@storybook/react';
import { fromJS } from 'immutable';
import { store } from '../redux/configureStore';
import { store as immutableStore } from '../redux/immutable/configureStore';
import radioGroupText from './radioGroup.md';

import { Provider } from 'react-redux';
import ImmutableReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';
import Grid from '@material-ui/core/Grid';
import { Field as ImmutableField } from 'redux-form/immutable';
import RadioGroup from '@e-group/material/RadioGroup';
import RadioGroupField from '@e-group/material-form/RadioGroupField';
import { Field } from 'redux-form';
import ReduxForm from '../components/ReduxForm';

storiesOf('RadioGroup', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add(
    'default',
    () => (
      <RadioGroup
        margin="normal"
        fullWidth
        required
        label="default"
        options={[
          {
            key: 'label1',
            value: '1',
            label: 'label1'
          },
          {
            key: 'label2',
            value: '2',
            label: 'label2'
          },
          {
            key: 'label3',
            value: '3',
            label: 'label3'
          }
        ]}
      />
    ),
    {
      notes: radioGroupText,
      info: {
        propTables: [RadioGroup],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with error helperText',
    () => (
      <RadioGroup
        label="with error"
        options={[
          {
            key: 'label1',
            value: '1',
            label: 'label1'
          },
          {
            key: 'label2',
            value: '2',
            label: 'label2'
          },
          {
            key: 'label3',
            value: '3',
            label: 'label3'
          }
        ]}
        error
        helperText="fill in this option is required!"
      />
    ),
    {
      notes: radioGroupText,
      info: {
        propTables: [RadioGroup],
        propTablesExclude: [Provider]
      }
    }
  )
  .add(
    'with Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          gender: 'male',
          day: 'Monday'
        });
        const handleChange = values => {
          setValues(values);
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ReduxForm onChange={handleChange} initialValues={values}>
                <Field
                  name="gender"
                  component={RadioGroupField}
                  margin="normal"
                  fullWidth
                  helperText="please choose your gender"
                  required
                  label="gender"
                  options={[
                    {
                      key: 'male',
                      value: 'male',
                      label: 'male'
                    },
                    {
                      key: 'female',
                      value: 'female',
                      label: 'female'
                    }
                  ]}
                />
                <Field
                  name="day"
                  component={RadioGroupField}
                  margin="normal"
                  fullWidth
                  required
                  label="pick one day"
                  options={[
                    {
                      key: 'Monday',
                      value: 'Monday',
                      label: 'Monday'
                    },
                    {
                      key: 'Tuesday',
                      value: 'Tuesday',
                      label: 'Tuesday'
                    },
                    {
                      key: 'Wednesday',
                      value: 'Wednesday',
                      label: 'Wednesday'
                    },
                    {
                      key: 'Thursday',
                      value: 'Thursday',
                      label: 'Thursday'
                    },
                    {
                      key: 'Friday',
                      value: 'Friday',
                      label: 'Friday'
                    },
                    {
                      key: 'Saturday',
                      value: 'Saturday',
                      label: 'Saturday'
                    },
                    {
                      key: 'Sunday',
                      value: 'Sunday',
                      label: 'Sunday'
                    }
                  ]}
                />
                <Field
                  name="gender2"
                  component={RadioGroupField}
                  margin="normal"
                  fullWidth
                  helperText="please choose your gender"
                  required
                  label="gender"
                  options={[
                    {
                      key: 'male',
                      value: 'male',
                      label: 'male'
                    },
                    {
                      key: 'female',
                      value: 'female',
                      label: 'female'
                    }
                  ]}
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{
                    invalid: true,
                    touched: true,
                    error: 'fill in this option is required!'
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
      notes: radioGroupText,
      info: {
        propTables: [RadioGroup],
        propTablesExclude: [Provider]
      }
    }
  )

storiesOf('RadioGroup', module)
  .addDecorator(story => <Provider store={immutableStore}>{story()}</Provider>)
  .add(
    'with immutable Field',
    () => {
      const Form = () => {
        const [values, setValues] = React.useState({
          gender: 'male',
          day: 'Monday'
        });
        const handleChange = values => {
          setValues(values.toJS());
        };
        return (
          <Grid container>
            <Grid item xs={6}>
              <ImmutableReduxForm onChange={handleChange} initialValues={fromJS(values)}>
                <ImmutableField
                  name="gender"
                  component={RadioGroupField}
                  margin="normal"
                  fullWidth
                  helperText="please choose your gender"
                  required
                  label="gender"
                  options={[
                    {
                      key: 'male',
                      value: 'male',
                      label: 'male'
                    },
                    {
                      key: 'female',
                      value: 'female',
                      label: 'female'
                    }
                  ]}
                />
                <ImmutableField
                  name="day"
                  component={RadioGroupField}
                  margin="normal"
                  fullWidth
                  required
                  label="pick one day"
                  options={[
                    {
                      key: 'Monday',
                      value: 'Monday',
                      label: 'Monday'
                    },
                    {
                      key: 'Tuesday',
                      value: 'Tuesday',
                      label: 'Tuesday'
                    },
                    {
                      key: 'Wednesday',
                      value: 'Wednesday',
                      label: 'Wednesday'
                    },
                    {
                      key: 'Thursday',
                      value: 'Thursday',
                      label: 'Thursday'
                    },
                    {
                      key: 'Friday',
                      value: 'Friday',
                      label: 'Friday'
                    },
                    {
                      key: 'Saturday',
                      value: 'Saturday',
                      label: 'Saturday'
                    },
                    {
                      key: 'Sunday',
                      value: 'Sunday',
                      label: 'Sunday'
                    }
                  ]}
                />
                <ImmutableField
                  name="gender2"
                  component={RadioGroupField}
                  margin="normal"
                  fullWidth
                  helperText="please choose your gender"
                  required
                  label="gender"
                  options={[
                    {
                      key: 'male',
                      value: 'male',
                      label: 'male'
                    },
                    {
                      key: 'female',
                      value: 'female',
                      label: 'female'
                    }
                  ]}
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{
                    invalid: true,
                    touched: true,
                    error: 'fill in this option is required!'
                  }}
                />
              </ImmutableReduxForm>
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
      notes: radioGroupText,
      info: {
        propTables: [RadioGroup],
        propTablesExclude: [Provider]
      }
    }
  );
