import React from 'react';
import * as CONFIG from '../constants/form-config';
import {OPTIONS} from '../../../constants/options';
import {Dropdown} from '../components/dropdown/dropdown';
import {Autocomplete} from '../components/autocomplete/autocomplete';
import {Switch} from '../components/switch/switch';
import {RadioGroup} from '../components/radio-group/radio-group';
import {DraftJs} from '../components/draft-js/draft-js';
import {TextInput} from '../components/text-input/text-input';
import * as CONTROL_TYPE from '../../../constants/control-types';
import {renderError} from '../../../services/control-errors';
import {composeValidators} from '../../../services/validation';

export const renderControls = (values, mutators) => {
    return Object.entries(CONFIG.FORM_SCHEMA).map(([name, controlData]) => {
        const {
            type,
            autocompleteType,
            groupName
        } = controlData;

        const {setValue} = mutators;

        const validationRules = CONFIG.getValidationRules(values)[name] || [];
        const validate = value => composeValidators(validationRules)(value) || undefined;

        const commonProps = {
            name,
            key: name,
            validateFields: [],
            renderError,
            validate
        };

        switch(type) {
            case CONTROL_TYPE.DROPDOWN:
                return <Dropdown
                  {...commonProps}
                  options={OPTIONS}
                />;
            case CONTROL_TYPE.AUTOCOMPLETE:
                return <Autocomplete
                  {...commonProps}
                  autocompleteType={autocompleteType}
                  setValue={setValue}
                />;
            case CONTROL_TYPE.SWITCH:
                return <Switch
                  {...commonProps}
                />;
            case CONTROL_TYPE.RADIOGROUP:
                return <RadioGroup
                  {...commonProps}
                  groupName={groupName}
                  options={OPTIONS}
                />;
            case CONTROL_TYPE.DRAFTJS:
                return <DraftJs
                  {...commonProps}
                  setValue={setValue}
                />;
            case CONTROL_TYPE.TEXT:
            default:
                return <TextInput
                  {...commonProps}
                />;
        }
    });
};
