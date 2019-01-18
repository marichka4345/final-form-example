import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import TextInputControl from '../../../common/text-input/text-input';
import {shouldDisplayError} from '../../../../services/control-errors';

export const TextInput  = ({name, renderError}) => {
    const renderText = ({input, meta}) => {
        const controlProps = {
            input,
            hasError: shouldDisplayError(meta)
        };

        return (
          <Fragment>
              <TextInputControl  {...controlProps} />
              {renderError(meta)}
          </Fragment>
        );
    };

    return (
      <Field
        name={name}
        render={renderText}
      />
    );
};

TextInput.propTypes = {
    name: PropTypes.string.isRequired,
    renderError: PropTypes.func.isRequired
};
