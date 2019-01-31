import {getDraftText} from './helpers';

export const composeValidators = validators => value =>
  validators.reduce((error, validator) => error || validator(value), null);


const validateValue = (predicate, msg) => !predicate ? msg : null;

export const min = (number, msg) =>
    value => validateValue(value.length >= number, msg);

export const max = (number, msg) =>
  value => validateValue(value.length < number, msg);

export const matches = (regexp, msg) =>
  value => validateValue(value.match(regexp), msg);

export const required = msg => value => validateValue(value, msg);

export const isEqual = (toCompareWith, msg) =>
  value => validateValue(value === toCompareWith, msg);

export const minDraftJs = (number, msg) =>
    value => validateValue(getDraftText(value).length >= number, msg);

export const maxDraftJs = (number, msg) =>
  value => validateValue(getDraftText(value).length < number, msg);
