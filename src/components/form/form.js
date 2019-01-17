import React from 'react';
import {Form} from 'react-final-form';
import {renderControls} from './services/control-factory';
import * as FIELDS from '../../constants/form-fields';
import {INITIAL_VALUES} from './constants/form-config';
import styles from './form.module.css';
import {SubmitButtons} from "../submit-buttons/submit-buttons";

export const TestForm = () => {
    const onSubmit = (values) => {
        new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).then(() => {
            console.log(values);
        });
    };

    const validate = values => {
        const errors = {};

        if (!values[[FIELDS.TEXT1]]) {
            errors[FIELDS.TEXT1] = 'Text1 is required';
        }

        return errors;
    };

    return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={INITIAL_VALUES}
        mutators={{
            setValue ([name, newValue], state, {changeValue}) {
                changeValue(state, name, () => newValue);
            }
        }}
      >
          {
              ({handleSubmit, form, submitting}) => {
                  return (
                    <form className={styles.fields} onSubmit={handleSubmit}>
                        {renderControls(form.mutators)}

                        <SubmitButtons
                          onClick={() => console.log(form)}
                          isSubmitting={submitting}
                          portalContainerSelector="submit-buttons"
                        />
                    </form>
                  )
              }
          }
      </Form>
    );
};
