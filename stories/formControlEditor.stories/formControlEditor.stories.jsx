import React from 'react';
import { storiesOf } from '@storybook/react';
import { Map } from 'immutable';
import { EditorState, RichUtils, ContentState, convertToRaw } from 'draft-js';

import Grid from '@material-ui/core/Grid';
import { Field as ImmutableField } from 'redux-form/immutable';
import { Provider } from 'react-redux';
import FormControlEditor from '@e-group/material-lab/FormControlEditor';
import FormControlEditorField from '@e-group/material-lab/FormControlEditorField';
import { store as immutableStore } from '../redux/immutable/configureStore';

import ImmutableReduxForm from '../components/immutable/ReduxForm';
import Highlight from '../components/Highlight';

storiesOf('FormControlEditor', module)
  .addDecorator((story) => (
    <Provider store={immutableStore}>{story()}</Provider>
  ))
  .add(
    'default',
    () => {
      const MyFormControllEditor = () => {
        const [editorState, setEditorState] = React.useState(
          EditorState.createWithContent(
            ContentState.createFromText('I am draft editor please edit me.')
          )
        );

        const handleKeyCommand = (command, editorState) => {
          const newState = RichUtils.handleKeyCommand(editorState, command);
          if (newState) {
            setEditorState(newState);
            return 'handled';
          }
          return 'not-handled';
        };

        return (
          <FormControlEditor
            fullWidth
            label="error"
            helperText="helperText"
            EditorProps={{
              editorState,
              handleKeyCommand,
              onChange: (editorState) => setEditorState(editorState),
            }}
          />
        );
      };
      return <MyFormControllEditor />;
    },
    {
      info: {
        propTables: [FormControlEditor],
      },
    }
  )
  .add(
    'with field',
    () => {
      const initialValues = Map({
        field1: EditorState.createWithContent(
          ContentState.createFromText('TEST')
        ),
        field2: EditorState.createWithContent(
          ContentState.createFromText('TEST')
        ),
      });

      const Form = () => {
        const [values, setValues] = React.useState(initialValues);

        const handleChange = (values) => {
          setValues(values);
        };

        return (
          <Grid container>
            <Grid item xs={6}>
              <ImmutableReduxForm
                onChange={handleChange}
                initialValues={initialValues}
              >
                <ImmutableField
                  component={FormControlEditorField}
                  name="field1"
                  fullWidth
                  margin="normal"
                  label="default"
                />
                <ImmutableField
                  component={FormControlEditorField}
                  name="field2"
                  fullWidth
                  margin="normal"
                  label="with error"
                  /* Pass meta props cause the failed prop type and don't worry it's just for demo */
                  meta={{
                    invalid: true,
                    touched: true,
                    error: 'error message',
                  }}
                />
              </ImmutableReduxForm>
            </Grid>
            <Grid item xs={6}>
              <Highlight
                code={JSON.stringify(
                  {
                    field1: convertToRaw(
                      values.get('field1').getCurrentContent()
                    ),
                    field2: convertToRaw(
                      values.get('field2').getCurrentContent()
                    ),
                  },
                  null,
                  4
                )}
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
        propTables: [FormControlEditor],
      },
    }
  );
