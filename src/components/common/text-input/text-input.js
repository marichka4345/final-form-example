import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';

export default function TextInput ({input, hasError}) {
    const {name} = input;

    return (
      <TextField
        label={name}
        {...input}
        error={hasError}
      />
    );
};

TextInput.propTypes = {
    input: PropTypes.object.isRequired,
    hasError: PropTypes.bool.isRequired
};
