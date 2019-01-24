import React, {Fragment} from 'react';

import JssProvider from 'react-jss/lib/JssProvider';
import {create} from 'jss';
import {createGenerateClassName, jssPreset} from '@material-ui/core/styles';

import {TestForm} from './components/form/form';

const generateClassName = createGenerateClassName();
const jss = create({
    ...jssPreset(),
    insertionPoint: 'insertion-point-jss'
});

const portalSelector = 'submit-buttons';

export default () => {

    return (
      <JssProvider jss={jss} generateClassName={generateClassName}>
          <Fragment>

              <div id={portalSelector} />
              <TestForm portalSelector={portalSelector} />

          </Fragment>
      </JssProvider>
    );
}
