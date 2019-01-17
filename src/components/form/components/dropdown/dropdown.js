import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import DropdownControl from '../../../common/dropdown/dropdown';
import {OPTIONS} from '../../../../constants/options';

export const Dropdown = ({name}) => {
    const renderDropdown = ({input, meta}) => {
        const controlProps = {
            input,
            meta,
            values: OPTIONS
        };
        return (<DropdownControl {...controlProps} />);
    };

    return (
      <Field
        name={name}
        render={renderDropdown}
      />
    );
};

Dropdown.propTypes = {
    name: PropTypes.string.isRequired
};
