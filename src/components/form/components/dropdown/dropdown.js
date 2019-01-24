import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import {shouldDisplayError} from '../../../../services/control-errors';

export const Dropdown = ({name, renderError, options}) => {
    const renderControl = ({input, meta}) => {
        return (
          <Fragment>
              <FormControl
                error={shouldDisplayError(meta)}
                margin="dense"
                {...input}
              >
                  <InputLabel>{input.name}</InputLabel>

                  <Select {...input}>
                      {
                          options.map(({id, value}) => (
                            <MenuItem key={id} value={id}>{value}</MenuItem>
                          ))
                      }
                  </Select>
              </FormControl>

              {renderError(meta)}
          </Fragment>
        );
    };

    return (
      <Field
        name={name}
        render={renderControl}
      />
    );
};

Dropdown.propTypes = {
    name: PropTypes.string.isRequired,
    renderError: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired
};
