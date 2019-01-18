import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

export default function RadioGroupControl ({groupName, input, values}) {
    return (
      <FormControl>
          <FormLabel>{groupName}</FormLabel>
          <RadioGroup {...input}>
              {
                  values.map(({id: value, value: label}) => (
                    <FormControlLabel
                      key={value}
                      control={<Radio color="primary" />}
                      label={label}
                      value={String(value)}
                    />
                  ))
              }
          </RadioGroup>
      </FormControl>
    );
}

RadioGroupControl.propTypes = {
    groupName: PropTypes.string.isRequired,
    input: PropTypes.object.isRequired,
    values: PropTypes.array.isRequired
};


