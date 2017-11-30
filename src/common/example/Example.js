import React from "react";
import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/light';
import js from 'react-syntax-highlighter/languages/hljs/javascript';
import androidstudio from 'react-syntax-highlighter/styles/hljs/androidstudio';

import PropTypes from "prop-types";

import styles from "./Example.less";

registerLanguage('javascript', js);

export default class Example extends React.Component {

  static babelAdded = false;

  static propTypes = {
    code: PropTypes.string,
    children: PropTypes.node,
    showLineNumbers: PropTypes.bool,
    isRunable: PropTypes.bool,
  }

  static defaultProps = {
    showLineNumbers: true,
    isRunable: false
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

  
  
  loadScript = (url, to) => {
    return new Promise(res => {
      const script = to.createElement('script');
      script.setAttribute('src', url);
      to.body.appendChild(script);
      script.onload = () => {
        res()
      }
    })
  };

  handleRender = () => {

    this.window = window.open('', 'reactwindow', 'width=400; height=600');
    this.window.document.body.innerHTML = `<div id="root">Please wait ...</div>`;

    this.loadScript('https://unpkg.com/react@16/umd/react.production.min.js', this.window.document).then(() => {
      this.loadScript('https://unpkg.com/react-dom@16/umd/react-dom.production.min.js', this.window.document).then(() => {
        this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.6.0/prop-types.min.js', this.window.document).then(() => {
          const s = this.window.document.createElement('script');
          let code = this.state.fullText || this.state.text;
          code = code.replace(/import(.*)\n/g, '');
          s.text = window.Babel.transform(code, {
            presets: ["react"],
            plugins: ["transform-class-properties"]
          }).code;
          this.window.document.body.appendChild(s);
        })
      })
    })
  }

  componentDidMount() {
    if(Example.babelAdded === false && this.props.isRunable) {
      Example.babelAdded = true;
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.min.js', document);
    }
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
          style={androidstudio}>
          {this.state.text}
        </SyntaxHighlighter>
        {this.state.fullText && <span className={styles.more} onClick={this.handleClick}>Pokaż cały kod tego przykładu</span>}
        {this.props.isRunable && <span className={styles.run} onClick={this.handleRender}>Uruchom w nowym oknie</span>}
      </div>
    )
  }
}