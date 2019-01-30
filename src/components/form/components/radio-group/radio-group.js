import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiRadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControl from '@material-ui/core/FormControl';
import {shouldDisplayError} from '../../../../services/control-errors';

export const RadioGroup = ({name, groupName, renderError, options, validate, validateFields}) => {
    const renderControl = ({input, meta}) => {
        return (
          <Fragment>
              <FormControl
                margin="dense"
                error={shouldDisplayError(meta)}
              >
                  <FormLabel>{groupName}</FormLabel>
                  <MuiRadioGroup {...input}>
                      {
                          options.map(({id: value, value: label}) => (
                            <FormControlLabel
                              key={value}
                              control={<Radio color="primary" />}
                              label={label}
                              value={String(value)}
                            />
                          ))
                      }
                  </MuiRadioGroup>
              </FormControl>

              {renderError(meta)}
          </Fragment>
        );
    };

    return (
      <Field
        type="radio"
        name={name}
        render={renderControl}
        validate={validate}
        validateFields={validateFields}
      />
    );
};

RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
    renderError: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    validate: PropTypes.func.isRequired,
    validateFields: PropTypes.array.isRequired
};
