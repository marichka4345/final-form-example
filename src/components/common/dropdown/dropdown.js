import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

export default function Dropdown({input, hasError, values}) {
    const {name} = input;

    return (
      <FormControl
        error={hasError}
        {...input}
      >
          <InputLabel>{name}</InputLabel>

          <Select {...input}>
              {
                  values.map(({id, value}) => (
                    <MenuItem key={id} value={id}>{value}</MenuItem>
                  ))
              }
          </Select>
      </FormControl>
    );
};

Dropdown.propTypes = {
    input: PropTypes.object.isRequired,
    hasError: PropTypes.bool.isRequired,
    values: PropTypes.array.isRequired
};

