import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import DropdownControl from '../../../common/dropdown/dropdown';
import {OPTIONS} from '../../../../constants/options';
import {shouldDisplayError} from '../../../../services/control-errors';

export const Dropdown = ({name, renderError}) => {
    const renderDropdown = ({input, meta}) => {
        const controlProps = {
            input,
            hasError: shouldDisplayError(meta),
            values: OPTIONS
        };
        return (
          <Fragment>
              <DropdownControl {...controlProps} />
              {renderError(meta)}
          </Fragment>
        );
    };

    return (
      <Field
        name={name}
        render={renderDropdown}
      />
    );
};

Dropdown.propTypes = {
    name: PropTypes.string.isRequired,
    renderError: PropTypes.func.isRequired
};
