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
            onSubmitWithError,
            isSubmitting
        } = this.props;

        return ReactDOM.createPortal(
          <div className={styles.root}>
              <SubmitButton
                isSubmitting={isSubmitting}
                onClick={onSubmit}
                title="Save with validation"
              />
              <SubmitButton
                isSubmitting={isSubmitting}
                onClick={onSubmitWithoutValidation}
                title="Save without validation"
              />
              <SubmitButton
                isSubmitting={isSubmitting}
                onClick={onSubmitWithError}
                title="Save with server error"
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
    onSubmitWithoutValidation: PropTypes.func.isRequired,
    onSubmitWithError: PropTypes.func.isRequired
};
