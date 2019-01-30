import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import Select from 'react-select';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import NoSsr from '@material-ui/core/NoSsr';
import {OPTIONS} from '../../../../constants/options';
import {AUTOCOMPLETE_TYPE} from '../../../../constants/autocomplete-types';
import {shouldDisplayError} from '../../../../services/control-errors';

const options = OPTIONS.map(({id: value, value: label}) => ({value, label}));

function MultiValue(props) {
    return (
      <Chip
        tabIndex={-1}
        label={props.children}
        onDelete={props.removeProps.onClick}
        deleteIcon={<CancelIcon {...props.removeProps} />}
      />
    );
}

const components = {
    MultiValue
};

const getSelectErrorStyle = hasError => ({
    control: provided => ({
        ...provided,
        borderColor: hasError ? 'red' : '#ccc'
    })
});

export class Autocomplete extends Component {
    state = {
        selectedOption: null
    };

    onChange = async (selectedOption) => {
        const {
            setValue,
            name,
            autocompleteType
        } = this.props;

        await this.setState({selectedOption});

        const value = autocompleteType === AUTOCOMPLETE_TYPE.SINGLE
          ? selectedOption.value
          : selectedOption.map(({value}) => value);

        setValue(name, value);
    };

    renderControl = ({input, meta}) => {
        const {autocompleteType, name, renderError} = this.props;

        const hasError = shouldDisplayError(meta);

        return (
          <Fragment>
              <FormControl
                fullWidth
                margin="dense"
                error={hasError}
              >
                  <FormLabel>{name}</FormLabel>

                  <NoSsr>
                      <Select
                        {...input}
                        styles={getSelectErrorStyle(hasError)}
                        options={options}
                        placeholder='Search a value'
                        value={this.state.selectedOption}
                        onChange={this.onChange}
                        isMulti={autocompleteType === AUTOCOMPLETE_TYPE.MULTI}
                        components={components}
                      />
                  </NoSsr>
              </FormControl>

              {renderError(meta)}
          </Fragment>
        );
    };

    render() {
        const {name, validate, validateFields} = this.props;

        return (
          <Field
            name={name}
            render={this.renderControl}
            validate={validate}
            validateFields={validateFields}
          />
        );
    }
};

Autocomplete.propTypes = {
    name: PropTypes.string.isRequired,
    autocompleteType: PropTypes.string,
    setValue: PropTypes.func.isRequired,
    renderError: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    validateFields: PropTypes.array.isRequired
};

Autocomplete.defaultProps = {
    autocompleteType: AUTOCOMPLETE_TYPE.SINGLE
};
