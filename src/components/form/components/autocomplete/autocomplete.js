import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import {AUTOCOMPLETE_TYPE} from './constants/types';
import AutocompleteControl from '../../../common/autocomplete/autocomplete';
import {OPTIONS} from '../../../../constants/options';
import {shouldDisplayError} from '../../../../services/control-errors';

const options = OPTIONS.map(({id: value, value: label}) => ({value, label}));

export const Autocomplete = ({name, type, mutators, renderError}) => {
    const renderAutocomplete = ({input, meta}) => {
        const controlProps = {
            input,
            type,
            options,
            mutators,
            hasError: shouldDisplayError(meta)
        };
        return (
          <Fragment>
              <AutocompleteControl {...controlProps} />
              {renderError(meta)}
          </Fragment>
        )
    };

    return (
      <Field
        name={name}
        render={renderAutocomplete}
      />
    );
};

Autocomplete.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    mutators: PropTypes.object.isRequired,
    renderError: PropTypes.func.isRequired
};

Autocomplete.defaultProps = {
    type: AUTOCOMPLETE_TYPE.SINGLE
};
