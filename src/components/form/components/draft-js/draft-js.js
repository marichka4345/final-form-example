import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {Field} from 'react-final-form';
import {RichUtils} from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createInlineToolbarPlugin from 'draft-js-inline-toolbar-plugin';
import IconButton from '@material-ui/core/IconButton';
import {shouldDisplayError} from '../../../../services/control-errors';
import * as TEXT_STYLE from './constants/text-styles';
import {TOOLBAR_ICONS} from './constants/draft-js-toolbar';
import 'draft-js/dist/Draft.css';
import styles from './draft-js.module.css';

const inlineToolbarPlugin = createInlineToolbarPlugin();
const { InlineToolbar } = inlineToolbarPlugin;

export class DraftJs extends Component {
    setEditor = editor => {
        this.editor = editor;
    };

    focusEditor = () => {
        if (this.editor) {
            this.editor.focus();
        }
    };

    onChange = editorState => {
        const {name, setValue} = this.props;

        setValue(name, editorState);
    };

    onStyleBtnClick = (e, value) => {
        const style = e.currentTarget.name;
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

    renderToolbar = ({value}) => {
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
                      onClick={e => this.onStyleBtnClick(e, value)}
                      onMouseDown={e => e.preventDefault()}
                    >
                        {TOOLBAR_ICONS[style]}
                    </IconButton>
                  ))
              }
          </Fragment>
        );
    };

    renderEditor = ({input, meta}) => {
        const {renderError} = this.props;

        const errorClass = shouldDisplayError(meta) ? styles.error : '';

        return (
          <Fragment>
              {renderError(meta)}

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
                      {() => this.renderToolbar(input)}
                  </InlineToolbar>
              </div>
          </Fragment>
        );
    };

    render() {
        const {name, validate, validateFields} = this.props;

        return (
          <Field
            name={name}
            render={this.renderEditor}
            validate={validate}
            validateFields={validateFields}
          />
        );
    }
}

DraftJs.propTypes = {
    name: PropTypes.string.isRequired,
    setValue: PropTypes.func.isRequired,
    renderError: PropTypes.func.isRequired,
    validate: PropTypes.func.isRequired,
    validateFields: PropTypes.array.isRequired
};

