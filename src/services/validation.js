export const min = (number, msg) => {
    return value =>
      value.length < number
        ? msg
        : null;
};

export const max = (number, msg) => {
    return value =>
      value.length > number
        ? msg
        : null;
};

export const matches = (regexp, msg) => {
    return value =>
      !value.match(regexp)
        ? msg
        : null;
};

export const required = msg => value => !value ? msg : null;

export const isEqual = (toCompareWith, msg) => {
    return value =>
      value !== toCompareWith
        ? msg
        : null;
};

export const minDraftJs = (number, msg) => {
    return value => {
        const text = value.getCurrentContent().getPlainText('');

        return text.length < number
          ? msg
          : null;
    };
};

export const maxDraftJs = (number, msg) => {

    return value => {
        const text = value.getCurrentContent().getPlainText('');

        return text.length > number
          ? msg
          : null;
    };
};
