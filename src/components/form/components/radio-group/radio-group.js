import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import RadioGroupControl from '../../../common/radio-group/radio-group';
import {OPTIONS} from '../../../../constants/options';

export const RadioGroup = ({name, groupName}) => {
    const renderRadioGroup = ({input, meta}) => {
        const controlProps = {
            input,
            meta,
            groupName,
            values: OPTIONS
        };
        return (<RadioGroupControl {...controlProps} />);
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
    groupName: PropTypes.string.isRequired
};
