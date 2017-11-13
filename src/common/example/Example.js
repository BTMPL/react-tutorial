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

  state = {
    text: '',
    fullText: undefined
  }

  extractImportant = (input) => {
    const text = [];
    let extract = false;
    const fullText = input.filter(item => {
      if(item.indexOf('@important') > -1) {
        extract = true;
        return false;
      }
      else if(item.indexOf('@end-important') > -1) {
        extract = false;
        return false;
      }
      if(extract) text.push(item);
      return true;
    })
    return {
      text,
      fullText
    }
  }

  componentWillReceiveProps(nextProps) {
    this.sync(nextProps);
  }

  componentWillMount() {
    this.sync(this.props);
  }

  sync = (props) => {
    let code;
    if(props.code) {
      code = props.code.split("\n");
    }
    else {
      code = props.children.toString().split("\n").slice(1);
      const spacing = code[0].match(/(\s+)/ig)[0];
      if(spacing.length > 0) code = code.map(item => item.substr(spacing.length))
    }    
    if(code.join("\n").indexOf('@important') > -1) {
      
      const { text, fullText } = this.extractImportant(code)
      this.setState({
        text: text.join("\n"),
        fullText: fullText.join("\n"),
      });
    }
    else {
      this.setState({
        text: code.join("\n")
      });     
    } 
  } 

  handleClick = () => {
    this.setState({
      text: this.state.fullText,
      fullText: undefined
    });
  }

  render() {
    return (
      <div className={styles.example}>
        <SyntaxHighlighter 
          language="javascript" 
          showLineNumbers={this.props.showLineNumbers}
          style={style}>
          {this.state.text}
        </SyntaxHighlighter>
        {this.state.fullText && <span className={styles.more} onClick={this.handleClick}>Pokaż cały kod tego przykładu</span>}
      </div>
    )
  }
}