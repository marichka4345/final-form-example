import {EditorState, ContentState} from 'draft-js';
import * as FIELDS from '../../../constants/form-fields';
import {OPTIONS} from '../../../constants/options';
import * as CONTROL_TYPE from '../../../constants/control-types';
import {text} from '../../../constants/validation-regexps';
import {AUTOCOMPLETE_TYPE} from '../../common/autocomplete/constants/types';
import {min, max, required, isEqual, matches, minDraftJs, maxDraftJs} from '../../../services/validation';

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
    [FIELDS.DRAFTJS]: EditorState.createWithContent(ContentState.createFromText('')),
    [FIELDS.RADIOGROUP1]: ''
};

export const errors = (values) => ({
    [FIELDS.TEXT1]: [
      matches(text, 'Text1 should not have special symbols at start/end'),
      min(2, 'Text1 should have minimum 2 symbols'),
      max(100, 'Text1 should have maximum 100 symbols'),
      required('Text1 is required')
    ],
    [FIELDS.TEXT2]: [
      isEqual(values[FIELDS.TEXT1], 'Text2 should match text1'),
      required('Text2 is required')
    ],
    [FIELDS.DROPDOWN1]: [
      required('Dropdown1 is required')
    ],
    [FIELDS.AUTOCOMPLETE1]: [
      required('Autocomplete1 is required')
    ],
    [FIELDS.AUTOCOMPLETE2]: [
      min(2, 'You should choose at least 2 values'),
      max(5, 'You should choose maximum 5 values'),
      required('Autocomplete2 is required')
    ],
    [FIELDS.DRAFTJS]: [
      minDraftJs(5, 'You should enter minimum 5 symbols'),
      maxDraftJs(100, 'You should enter less than 100 symbols')
    ],
    [FIELDS.RADIOGROUP1]: [
      required('You should choose one option')
    ]
});
