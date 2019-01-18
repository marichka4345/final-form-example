import React, {Component, Fragment} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import {CHECKBOX_LIST_DATA} from '../../../constants/checkbox-list-data';

export default class ListControl extends Component {
    constructor(props) {
        super(props);

        const openedOptionState = Object.keys(CHECKBOX_LIST_DATA).reduce((result, key) => {
            result[`${key}Opened`] =
              result[`${key}Checked`] =
                false;
            return result;
        }, {});

        this.state = {
            ...openedOptionState
        };
    }
    state = {
        open: false
    };

    openCollapse = key => {
        this.setState(state => ({[`${key}Opened`]: !state[`${key}Opened`]}));
    };

    handleChange = key => {
        this.setState(state => ({[`${key}Checked`]: !state[`${key}Checked`]}));
    };

    handleOptionChange = () => {
        console.log('AAA');
    };

    render() {
        return (
          <List
            subheader={<ListSubheader component="div">List</ListSubheader>}
          >
              {
                  Object.entries(CHECKBOX_LIST_DATA).map(([key, options]) => {
                      return (
                        <Fragment key={key}>
                            <ListItem onClick={() => this.openCollapse(key)}>
                                <FormControlLabel
                                  control={
                                      <Checkbox
                                        checked={this.state[`${key}Checked`]}
                                        onChange={() => this.handleChange(key)}
                                        value={key}
                                        color="primary"
                                      />
                                  }
                                  label={key}
                                />

                                {this.state.open ? <ExpandLess/> : <ExpandMore/>}
                            </ListItem>

                            <Collapse in={this.state[`${key}Opened`]}>
                                <ListItem>
                                    <FormGroup>
                                {
                                    options.map(option => (
                                      <FormControlLabel
                                        key={option}
                                        control={
                                            <Checkbox
                                              checked={true}
                                              onChange={this.handleOptionChange('checkedB')}
                                              value={option}
                                              color="primary"
                                            />
                                        }
                                        label={option}
                                      />
                                    ))
                                }
                                    </FormGroup>
                                </ListItem>
                            </Collapse>
                        </Fragment>
                      )
                  })
              }
          </List>
        );
    }
}

ListControl.propTypes = {};
