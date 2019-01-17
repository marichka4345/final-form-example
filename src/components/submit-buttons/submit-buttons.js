import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import styles from './submit-buttons.module.css';

export class SubmitButtons extends Component {
    element = document.createDocumentFragment();

    componentDidMount() {
        const {portalContainerSelector} = this.props;
        document.getElementById(portalContainerSelector).appendChild(this.element);
    }

    componentWillUnmount() {
        const {portalContainerSelector} = this.props;
        document.getElementById(portalContainerSelector).removeChild(this.element);
    }

    render() {
        const {onClick, isSubmitting} = this.props;

        return ReactDOM.createPortal(
          <div className={styles.root}>
              <Button
                variant="contained"
                color="primary"
                onClick={onClick}
                disabled={isSubmitting}
                className={styles.button}
              >
                  Save with validation
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={onClick}
                disabled={isSubmitting}
                className={styles.button}
              >
                  Save without validation
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={onClick}
                disabled={isSubmitting}
                className={styles.button}
              >
                  Save with server error
              </Button>
          </div>,
          this.element
        );
    }

}
