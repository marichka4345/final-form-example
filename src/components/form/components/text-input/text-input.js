import React from 'react';
import {Field} from 'react-final-form';
import TextInputControl from '../../../common/text-input/text-input';

export const TextInput  = ({name}) => {
    const renderText = ({input, meta}) => {
        const controlProps = {input, meta};

        return <TextInputControl  {...controlProps} />
    };

    return (
      <Field
        name={name}
        render={renderText}
      />
    );
};
