import React from "react";
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light';
import js from 'react-syntax-highlighter/dist/languages/javascript';
import { androidstudio as style } from 'react-syntax-highlighter/dist/styles';

import PropTypes from "prop-types";

import styles from "./Example.less";

registerLanguage('javascript', js);

export default class Example extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    children: PropTypes.node,
    showLineNumbers: PropTypes.bool
  }

  static defaultProps = {
    showLineNumbers: true
  }

  render() {
    if(this.props.code) {
      return (
        <div className={styles.example}>
          <SyntaxHighlighter 
            language="javascript" 
            showLineNumbers={this.props.showLineNumbers}
            style={style}>
            {this.props.code}
          </SyntaxHighlighter>
        </div>
      );
    }
    else {
      let text = this.props.children.toString().split("\n").slice(1);
      const spacing = text[0].match(/(\s+)/ig)[0];
      if(spacing.length > 0) text = text.map(item => item.substr(spacing.length))
      return (
        <div className={styles.example}>
          <SyntaxHighlighter 
            language="javascript" 
            showLineNumbers={this.props.showLineNumbers}
            style={style}>
            {text.join("\n")}
          </SyntaxHighlighter>
        </div>
      )
    }
  }
}