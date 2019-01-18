import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import Editor from 'draft-js-plugins-editor';
import {RichUtils} from 'draft-js';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import IconButton from '@material-ui/core/IconButton';
import * as TEXT_STYLE from './constants/text-styles';
import {TOOLBAR_ICONS} from './constants/draft-js-toolbar';
import 'draft-js/dist/Draft.css';
import styles from './draft-js.module.css';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

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
        const {input: {name}, mutators: {setValue}} = this.props;

        setValue(name, editorState);
    };

    onStyleBtnClick = e => {
        const style = e.currentTarget.name;
        const {value} = this.props.input;
        this.onChange(RichUtils.toggleInlineStyle(value, style));
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
          <Fragment>
              {
                  textStyles.map(style => (
                    <IconButton
                      key={style} name={style}
                      onClick={this.onStyleBtnClick}
                      onMouseDown={e => e.preventDefault()}
                    >
                        {TOOLBAR_ICONS[style]}
                    </IconButton>
                  ))
              }
          </Fragment>
        );
    };

    render() {
        const {input, hasError} = this.props;

        const errorClass = hasError ? styles.error : '';

        return (
          <div
            className={`${styles.editor} ${errorClass}`}
            onClick={this.focusEditor}
          >
              <Editor
                {...input}
                ref={this.setEditor}
                editorState={input.value}
                onChange={this.onChange}
                handleKeyCommand={this.handleKeyCommand}
                plugins={[inlineToolbarPlugin]}
              />

              <InlineToolbar>
                  {() => this.renderToolbar()}
              </InlineToolbar>
          </div>
        );
    }
}

DraftJsEditor.propTypes = {
    input: PropTypes.object.isRequired,
    mutators: PropTypes.shape({
        setValue: PropTypes.func.isRequired
    }).isRequired,
    hasError: PropTypes.bool.isRequired
}
