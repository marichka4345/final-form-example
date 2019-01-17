import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/es/ListSubheader/ListSubheader';
import ListItemText from '@material-ui/core/es/ListItemText/ListItemText';

// TODO: Try expandable list with checkboxes

export default function ListControl () {
    return (
      <List
        subheader={<ListSubheader component="div">List</ListSubheader>}
      >
          <ListItem>
              <ListItemText primary="text1"/>
          </ListItem>
          <ListItem>
              <ListItemText primary="text2"/>
          </ListItem>
      </List>
    );
}

ListControl.propTypes = {};
