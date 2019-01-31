import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form} from 'react-final-form';
import {renderControls} from './services/control-factory';
import {INITIAL_VALUES, MUTATORS} from './constants/form-config';
import {SubmitButtons} from '../submit-buttons/submit-buttons';
import {TEXT1} from '../../constants/form-fields';
import {getServerError, getServerResponse} from '../../services/helpers';
import styles from './form.module.css';

export class TestForm extends Component {
    state = {
        isSubmitting: false
    };

    componentDidMount() {
        console.log('Form initialized with ', INITIAL_VALUES);
    }

    changeIsSubmitting = isSubmitting => {
        this.setState({isSubmitting});
    };

    onSubmit = async values => {
        this.changeIsSubmitting(true);

        if (values[TEXT1] !== 'sun') {
            const {errors} = await getServerError([TEXT1]);
            this.changeIsSubmitting(false);
            console.log('Got error ', errors);
            return errors;
        }

        const response = await getServerResponse(values);
        this.changeIsSubmitting(false);

        console.log('Submitted with ', response);
    };

    onSubmitWithoutValidation = async values => {
        this.changeIsSubmitting(true);

        const response = await getServerResponse(values);
        this.changeIsSubmitting(false);

        console.log('Submitted with ', response);
    };

    render() {
        const {portalSelector} = this.props;

        return (
          <Form
            onSubmit={this.onSubmit}
            initialValues={INITIAL_VALUES}
            mutators={MUTATORS}
          >
              {
                  ({handleSubmit, form: {submit, mutators}, values, dirty}) => {
                      return (
                        <form className={styles.fields} onSubmit={handleSubmit}>
                            <p>Form is {dirty ? 'dirty': 'pristine'}</p>

                            {renderControls(values, mutators)}

                            <SubmitButtons
                              onSubmit={submit}
                              onSubmitWithoutValidation={() => this.onSubmitWithoutValidation(values)}
                              isSubmitting={this.state.isSubmitting}
                              portalSelector={portalSelector}
                            />
                        </form>
                      )
                  }
              }
          </Form>
        );
    }
}

TestForm.propTypes = {
    portalSelector: PropTypes.string.isRequired
};
