import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SwitchElement from '@material-ui/core/Switch';

export const Switch = ({name}) => {
    const renderSwitch = ({input, meta}) => {
        const {value} = input;

        return (
          <Fragment>
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

              {meta.touched && meta.error && <span>{meta.error}</span>}
          </Fragment>
        );
    };

    return (
      <Field
        name={name}
        render={renderSwitch}
      />
    );
};

Switch.propTypes = {
    name: PropTypes.string.isRequired
};
