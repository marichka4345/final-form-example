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
    const handleSubmit = async values => {
        if (values[TEXT1] !== 'sun') {
            return await getServerError([TEXT1]);
        }

        await sleep(1000);

        window.alert('Submitted');
        console.log(values);
    };

    const validate = values => {
        const fieldNames = Object.keys(FORM_SCHEMA);

        return fieldNames.reduce(
          (errors, name) => {
              const validationRules = getValidationRules(values)[name] || [];
              const fieldError = composeValidators(validationRules)(values[name]);
              if (fieldError) {
                errors[name] = fieldError;
              }
              return errors;
          },
          {}
        );
    };

    return (
      <Form
        onSubmit={handleSubmit}
        initialValues={INITIAL_VALUES}
        mutators={MUTATORS}
        validate={validate}
      >
          {
              ({handleSubmit, form: {submit, mutators}, submitting, values}) => {
                  return (
                    <form className={styles.fields} onSubmit={handleSubmit}>
                        {renderControls(mutators)}

                        <SubmitButtons
                          onSubmit={() => submit()}
                          onSubmitWithoutValidation={() => handleSubmit(values)}
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
