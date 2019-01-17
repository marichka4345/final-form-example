import React, {Component, Fragment} from 'react';
import {
    Editor, RichUtils
} from 'draft-js';
import IconButton from '@material-ui/core/IconButton';
import * as TEXT_STYLE from './constants/text-styles';
import {TOOLBAR_ICONS} from './constants/draft-js-toolbar';
import 'draft-js/dist/Draft.css';
import styles from './draft-js.module.css';

export default class DraftJsEditor extends Component {
    setEditor = editor => {
        this.editor = editor;
    };

    focusEditor = () => {
        if (this.editor) {
            this.editor.focus();
        }
    };

    onChange = editorState => {
        const {name, mutators: {setValue}} = this.props;

        setValue(name, editorState);
    };

    onStyleBtnClick = e => {
        const style = e.currentTarget.name;
        this.onChange(RichUtils.toggleInlineStyle(this.props.value, style));
    };

    handleKeyCommand = (command, editorState) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            this.onChange(newState);
            return 'handled';
        }

        return 'not-handled';
    };

    renderToolbar = () => {
        const textStyles = [
            TEXT_STYLE.BOLD,
            TEXT_STYLE.ITALIC,
            TEXT_STYLE.LINK
        ];

        return (
          <div className={styles.toolbar}>
              {
                  textStyles.map(style => (
                    <IconButton key={style} name={style} onClick={this.onStyleBtnClick}>
                        {TOOLBAR_ICONS[style]}
                    </IconButton>
                  ))
              }
          </div>
        );
    };

    render() {
        const {value} = this.props;

        return (
          <Fragment>
              <div
                className={styles.editor}
                onClick={this.focusEditor}
              >
                  <Editor
                    ref={this.setEditor}
                    editorState={value}
                    onChange={this.onChange}
                    handleKeyCommand={this.handleKeyCommand}
                  />
              </div>

              {this.renderToolbar()}
          </Fragment>
        );
    }
}
