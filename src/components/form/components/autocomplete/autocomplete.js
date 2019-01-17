import React from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import {AUTOCOMPLETE_TYPE} from './constants/types';
import AutocompleteControl from '../../../common/autocomplete/autocomplete';
import {OPTIONS} from '../../../../constants/options';

const options = OPTIONS.map(({id: value, value: label}) => ({value, label}));

export const Autocomplete = ({name, type, mutators}) => {
    const renderAutocomplete = ({input, meta}) => {
        const controlProps = {
            input,
            meta,
            type,
            options,
            mutators
        };
        return <AutocompleteControl {...controlProps} />
    };

    return (
      <Field name={name}>
          {renderAutocomplete}
      </Field>
    );
};

Autocomplete.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    mutators: PropTypes.object.isRequired
};

Autocomplete.defaultProps = {
    type: AUTOCOMPLETE_TYPE.SINGLE
};
