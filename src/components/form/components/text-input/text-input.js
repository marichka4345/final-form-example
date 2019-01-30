import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import {shouldDisplayError} from '../../../../services/control-errors';

export const TextInput  = ({name, renderError, validate, validateFields}) => {
    const renderControl = ({input, meta}) => {
        return (
          <Fragment>
              <TextField
                {...input}
                label={input.name}
                error={shouldDisplayError(meta)}
              />

              {renderError(meta)}
          </Fragment>
        );
    };

    return (
      <Field
        name={name}
        render={renderControl}
        validate={validate}
        validateFields={validateFields}
      />
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    renderError: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    validateFields: PropTypes.array.isRequired
};
