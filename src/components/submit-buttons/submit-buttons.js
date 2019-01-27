import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {SubmitButton} from './components/submit-button/submit-button';
import styles from './submit-buttons.module.css';

export class SubmitButtons extends Component {
    element = document.createDocumentFragment();

    componentDidMount() {
        const portalContainer = document.getElementById(this.props.portalSelector);
        portalContainer.appendChild(this.element);
    }

    componentWillUnmount() {
        const portalContainer = document.getElementById(this.props.portalSelector);
        portalContainer.removeChild(this.element);
    }

    render() {
        const {
            onSubmit,
            onSubmitWithoutValidation,
            isSubmitting
        } = this.props;

        return ReactDOM.createPortal(
          <div className={styles.root}>
              <SubmitButton
                isSubmitting={isSubmitting}
                onClick={onSubmit}
                title="Save with validation"
              />
              <p className={styles.prompt}>
                  Server error on Text1 will be returned after successful submit
                  if the value is other than <strong>sun</strong>
              </p>

              <SubmitButton
                isSubmitting={isSubmitting}
                onClick={onSubmitWithoutValidation}
                title="Save without validation"
              />
          </div>,
          this.element
        );
    }
}

SubmitButtons.propTypes = {
    portalSelector: PropTypes.string.isRequired,
    isSubmitting: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onSubmitWithoutValidation: PropTypes.func.isRequired
};
