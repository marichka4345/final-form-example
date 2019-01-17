import {EditorState} from 'draft-js';

import * as FIELDS from '../../../constants/form-fields';
import {OPTIONS} from '../../../constants/options';
import * as CONTROL_TYPE from '../../../constants/control-types';
// import {text} from '../../../constants/validation-regexps';
import {AUTOCOMPLETE_TYPE} from '../../common/autocomplete/constants/types';

export const FORM_SCHEMA = {
    [FIELDS.TEXT1]: {
        type: CONTROL_TYPE.TEXT
    },
    [FIELDS.TEXT2]: {
        type: CONTROL_TYPE.TEXT
    },
    [FIELDS.DROPDOWN1]: {
        type: CONTROL_TYPE.DROPDOWN
    },
    [FIELDS.DROPDOWN2]: {
        type: CONTROL_TYPE.DROPDOWN
    },
    [FIELDS.AUTOCOMPLETE1]: {
        type: CONTROL_TYPE.AUTOCOMPLETE,
        autocompleteType: AUTOCOMPLETE_TYPE.SINGLE
    },
    [FIELDS.AUTOCOMPLETE2]: {
        type: CONTROL_TYPE.AUTOCOMPLETE,
        autocompleteType: AUTOCOMPLETE_TYPE.MULTI
    },
    [FIELDS.TOGGLER]: {
        type: CONTROL_TYPE.SWITCH
    },
    [FIELDS.DRAFTJS]: {
        type: CONTROL_TYPE.DRAFTJS
    },
    [FIELDS.RADIOGROUP1]: {
        type: CONTROL_TYPE.RADIOGROUP,
        groupName: 'radioGroup1'
    }
};

export const INITIAL_VALUES = {
    [FIELDS.TEXT1]: '',
    [FIELDS.TEXT2]: '',
    [FIELDS.DROPDOWN1]: '',
    [FIELDS.DROPDOWN2]: OPTIONS[0].id,
    [FIELDS.AUTOCOMPLETE1]: '',
    [FIELDS.AUTOCOMPLETE2]: [],
    [FIELDS.TOGGLER]: false,
    [FIELDS.DRAFTJS]: EditorState.createEmpty(),
    [FIELDS.RADIOGROUP1]: ''
};

// export const VALIDATION_SCHEMA = Yup.object().shape({
//     [FIELDS.TEXT1]: Yup.string()
//       .min(2, 'Text1 should have minimum 2 symbols')
//       .max(100, 'Text1 should have maximum 100 symbols')
//       .matches(text, 'Text1 should not have special symbols at start/end')
//       .trim()
//       .required('Text1 is required'),
//     [FIELDS.TEXT2]: Yup.string()
//       .oneOf([Yup.ref(FIELDS.TEXT1)], 'Text2 should match text1')
//       .trim()
//       .required('Text2 is required'),
//     [FIELDS.DROPDOWN1]: Yup.string()
//       .required('Dropdown1 is required'),
//     [FIELDS.AUTOCOMPLETE1]: Yup.string()
//       .required('Autocomplete1 is required'),
//     [FIELDS.AUTOCOMPLETE2]: Yup.array()
//       .min(2, 'You should choose at least 2 values')
//       .max(5, 'You should choose maximum 5 values')
//       .required('Autocomplete2 is required')
// });
