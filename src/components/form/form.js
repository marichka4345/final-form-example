import React from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-final-form';
import {renderControls} from './services/control-factory';
import {
    INITIAL_VALUES,
    MUTATORS,
} from './constants/form-config';
import {SubmitButtons} from '../submit-buttons/submit-buttons';
import {TEXT1} from '../../constants/form-fields';
import {sleep, getServerError} from '../../services/helpers';

import styles from './form.module.css';

export const TestForm = ({portalSelector}) => {
    const onSubmit = async values => {
        if (values[TEXT1] !== 'sun') {
            return await getServerError([TEXT1]);
        }

        await sleep(1000);

        window.alert('Submitted');
        console.log(values);
    };

    const onSubmitWithoutValidation = async values => {
        await sleep(1000);

        window.alert('Submitted');
        console.log(values);
    };

    return (
      <Form
        onSubmit={onSubmit}
        initialValues={INITIAL_VALUES}
        mutators={MUTATORS}
      >
          {
              ({handleSubmit, form: {submit, mutators}, submitting, values}) => {
                  return (
                    <form className={styles.fields} onSubmit={handleSubmit}>
                        {renderControls(values, mutators)}

                        <SubmitButtons
                          onSubmit={() => submit()}
                          onSubmitWithoutValidation={() => onSubmitWithoutValidation(values)}
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
