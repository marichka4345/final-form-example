import React from 'react';
import * as CONFIG from '../constants/form-config';
import {Dropdown} from '../components/dropdown/dropdown';
import {Autocomplete} from '../components/autocomplete/autocomplete';
import {Switch} from '../components/switch/switch';
import {RadioGroup} from '../components/radio-group/radio-group';
import {DraftJs} from '../components/draft-js/draft-js';
import {TextInput} from '../components/text-input/text-input';
import * as CONTROL_TYPE from '../../../constants/control-types';
import {shouldDisplayError} from '../../../services/control-errors';

export const renderControls = (mutators, errorClass) => {
    return Object.entries(CONFIG.FORM_SCHEMA).map(([name, controlData]) => {

        const {
            type,
            autocompleteType,
            groupName
        } = controlData;

        const commonProps = {
            name,
            key: name,
            renderError(meta) {
                return (
                  shouldDisplayError(meta) &&
                  <div className={errorClass}>{meta.error}</div>
                );
            }
        };

        switch(type) {
            case CONTROL_TYPE.DROPDOWN:
                return <Dropdown
                  {...commonProps}
                />;
            case CONTROL_TYPE.AUTOCOMPLETE:
                return <Autocomplete
                  {...commonProps}
                  type={autocompleteType}
                  mutators={mutators}
                />;
            case CONTROL_TYPE.SWITCH:
                return <Switch
                  {...commonProps}
                />;
            case CONTROL_TYPE.RADIOGROUP:
                return <RadioGroup
                  {...commonProps}
                  groupName={groupName}
                />;
            case CONTROL_TYPE.DRAFTJS:
                return <DraftJs
                  {...commonProps}
                  mutators={mutators}
                />;
            case CONTROL_TYPE.TEXT:
            default:
                return <TextInput
                  {...commonProps}
                />;
        }
    });
};
