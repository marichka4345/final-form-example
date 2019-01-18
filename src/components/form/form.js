import React from 'react';
import {Form} from 'react-final-form';
import {renderControls} from './services/control-factory';
import {INITIAL_VALUES, errors} from './constants/form-config';
import {FORM_SCHEMA} from './constants/form-config';
import {SubmitButtons} from '../submit-buttons/submit-buttons';
import styles from './form.module.css';

export const TestForm = () => {
    const onSubmit = (values) => {
        new Promise(resolve => {
            setTimeout(resolve, 2000);
        }).then(() => {
            console.log(values);
        });
    };

    const validate = values => {
        const formErrors = {};

        Object.keys(FORM_SCHEMA).forEach(
          name => {
              const validationRules = errors(values)[name];
              formErrors[name] = validationRules ?
                validationRules
                .filter(validationRule => validationRule(values[name]))
                .map(validationRule => validationRule(values[name]))
                .pop()
                : null;
          }
        );

        return formErrors;
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
                        {renderControls(form.mutators, styles.error)}

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
