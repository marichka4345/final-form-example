import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import RadioGroupControl from '../../../common/radio-group/radio-group';
import {OPTIONS} from '../../../../constants/options';

export const RadioGroup = ({name, groupName, renderError}) => {
    const renderRadioGroup = ({input, meta}) => {
        const controlProps = {
            input,
            groupName,
            values: OPTIONS
        };
        return (
          <Fragment>
              <RadioGroupControl {...controlProps} />
              {renderError(meta)}
          </Fragment>
        );
    };

    return (
      <Field
        type="radio"
        name={name}
        render={renderRadioGroup}
      />
    );
};

RadioGroup.propTypes = {
    name: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
    renderError: PropTypes.func.isRequired
};
