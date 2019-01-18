import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import DraftJsEditor from '../../../common/draft-js/draft-js';
import {shouldDisplayError} from '../../../../services/control-errors';

export const DraftJs = ({name, mutators, renderError}) => {
    const renderDraftJs = ({input, meta}) => {
        const controlProps = {
            input,
            mutators,
            hasError: shouldDisplayError(meta)
        };

        return (
          <Fragment>
              {renderError(meta)}
              <DraftJsEditor {...controlProps} />
          </Fragment>
        );
    };

    return (
      <Field name={name}>
          {renderDraftJs}
      </Field>
    );
};

DraftJs.propTypes = {
    name: PropTypes.string.isRequired,
    mutators: PropTypes.object.isRequired,
    renderError: PropTypes.func.isRequired
};

