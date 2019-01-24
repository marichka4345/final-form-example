import React from 'react';

export const shouldDisplayError = ({error, submitError, touched, dirtySinceLastSubmit}) =>
  !!(touched && error || !dirtySinceLastSubmit && submitError);

export const renderError = meta => (
  shouldDisplayError(meta) &&
  <div className="control-error">{meta.error || meta.submitError}</div>
);
