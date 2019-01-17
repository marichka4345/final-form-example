import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField/TextField';

export default function TextInput ({input, meta}) {
    const {name} = input;

    return (
      <Fragment>
          <TextField
            label={name}
            {...input}
          />

          {meta.touched && meta.error && <span>{meta.error}</span>}
      </Fragment>
    );
};

TextInput.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired
};
