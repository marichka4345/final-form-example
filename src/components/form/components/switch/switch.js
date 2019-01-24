import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SwitchElement from '@material-ui/core/Switch';

export const Switch = ({name}) => {
    const renderControl = ({input}) => {
        const {value} = input;

        return (
          <FormControlLabel
            control={
                <SwitchElement
                  {...input}
                  checked={value}
                  value={name}
                  color="primary"
                />
            }
            label="Switch"
          />
        );
    };

    return (
      <Field
        type="checkbox"
        name={name}
        render={renderControl}
      />
    );
};

Switch.propTypes = {
    name: PropTypes.string.isRequired
};
