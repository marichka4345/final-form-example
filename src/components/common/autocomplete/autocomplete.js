import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import NoSsr from '@material-ui/core/NoSsr';
import FormControl from '@material-ui/core/FormControl';
import Chip from '@material-ui/core/Chip';
import CancelIcon from '@material-ui/icons/Cancel';
import {AUTOCOMPLETE_TYPE} from './constants/types';
import './autocomplete.css';

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

export default class Autocomplete extends Component {
    state = {
        selectedOption: null
    };

    onChange = async (selectedOption) => {
        const {
            mutators: {setValue},
            input: {name},
            type
        } = this.props;

        await this.setState({selectedOption});

        const value = type === AUTOCOMPLETE_TYPE.SINGLE
          ? selectedOption.value
          : selectedOption.map(({value}) => value);

        setValue(name, value);
    };

    render() {
        const {
            options,
            type,
            meta
        } = this.props;

        return (
          <div className="root">
              <FormControl
                fullWidth
                error={meta.touched && meta.error}
              >
                  <NoSsr>
                      <Select
                        options={options}
                        placeholder="Search a value"
                        value={this.state.selectedOption}
                        onChange={this.onChange}
                        isMulti={type === AUTOCOMPLETE_TYPE.MULTI}
                        components={components}
                      />
                  </NoSsr>
              </FormControl>
          </div>
        );
    }
}

Autocomplete.propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    mutators: PropTypes.object.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.any.isRequired,
        label: PropTypes.string.isRequired
    })).isRequired
};
