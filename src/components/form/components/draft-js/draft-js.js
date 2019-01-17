import React from 'react';
import {Field} from 'react-final-form';
import DraftJsEditor from '../../../common/draft-js/draft-js';

export const DraftJs = ({name, mutators}) => {
    const renderDraftJs = ({input: {name, value}}) => {
        const controlProps = {
            name,
            value,
            mutators
        };

        return (
          <DraftJsEditor {...controlProps} />
        );
    };

    return (
      <Field name={name}>
          {renderDraftJs}
      </Field>
    );
};

