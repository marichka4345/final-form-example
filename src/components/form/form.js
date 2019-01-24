import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-final-form';
import {renderControls} from './services/control-factory';
import {
    INITIAL_VALUES,
    FORM_SCHEMA,
    MUTATORS,
    getValidationRules
} from './constants/form-config';
import {composeValidators} from '../../services/validation';
import {SubmitButtons} from '../submit-buttons/submit-buttons';
import {TEXT1} from '../../constants/form-fields';
import {sleep, getServerError} from '../../services/helpers';

import styles from './form.module.css';

export const TestForm = ({portalSelector}) => {
    const onSubmit = async values => {
        await sleep(1000);

        window.alert('Submitted');
        console.log(values);
    };

    const onSubmitWithError = async values => {
        const errors = await getServerError([TEXT1]);
        if (errors) {
            return errors;
        }

        window.alert('Submitted');
        console.log(values);
    };

    const validate = values => {
        const fieldNames = Object.keys(FORM_SCHEMA);

        return fieldNames.reduce(
          (errors, name) => {
              const validationRules = getValidationRules(values)[name] || [];
              errors[name] = composeValidators(validationRules)(values[name]);
              return errors;
          },
          {}
        );
    };

    return (
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={INITIAL_VALUES}
        mutators={MUTATORS}
      >
          {
              ({handleSubmit, form: {submit, mutators}, submitting, values}) => {
                  console.log(values);
                  return (
                    <form className={styles.fields} onSubmit={handleSubmit}>
                        {renderControls(mutators)}

                        <SubmitButtons
                          onSubmit={() => submit()}
                          onSubmitWithoutValidation={() => onSubmit(values)}
                          onSubmitWithError={() => onSubmitWithError(values)}
                          isSubmitting={submitting}
                          portalSelector={portalSelector}
                        />
                    </form>
                  )
              }
          }
      </Form>
    );
};

TestForm.propTypes = {
    portalSelector: PropTypes.string.isRequired
};
