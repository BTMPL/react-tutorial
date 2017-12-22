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
    showLineNumbers: PropTypes.bool,
    isRunnable: PropTypes.bool,
  }

  static defaultProps = {
    showLineNumbers: true,
    isRunnable: false
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

  getExampleCSS() {
    return `
      .tweet {
        font-family: Arial;
        font-size: 12px;
        color: #222;
        padding: 10;
        background: #f7f7f7;
        margin: 0 0 10px 0;
      }

      .tweet p {
        margin: 5px 0 0 0;
      }

      .TweetForm {
        padding: 5px;
        background: #e7e7e7;
        margin: 0 0 10px 0;
      }

      .TweetForm input[type="text"] {
        width: calc(100% - 100px);
        padding: 5px;
      }

      .TweetForm button {
        width: 100px;
        padding: 5px;
      }
    `;
  }

  handleRender = () => {

    this.window = window.open('', 'reactwindow', 'width=400; height=600');
    this.window.document.body.innerHTML = `<div id="root">Ładowanie ...</div>`;

    const render = () => {
      const s = this.window.document.createElement('script');
      let code = this.state.fullText || this.state.text;            
      code = code.replace(/import(.*)\n/g, '');
      s.text = window.Babel.transform(code, {
        presets: ["react"],
        plugins: ["transform-class-properties", "transform-object-rest-spread"]
      }).code;

      let style = this.window.document.createElement('style');
      style.innerHTML = this.getExampleCSS();
      this.window.document.head.appendChild(style);
      this.window.document.body.appendChild(s);      
    }

    this.loadScript('https://unpkg.com/react@16/umd/react.production.min.js', this.window.document).then(() => {
      this.loadScript('https://unpkg.com/react-dom@16/umd/react-dom.production.min.js', this.window.document).then(() => {
        this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.6.0/prop-types.min.js', this.window.document).then(() => {
          this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/styled-components/2.2.4/styled-components.min.js', this.window.document).then(() => {
            this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/styled-components/2.3.0/styled-components.min.js', this.window.document).then(() => {
              this.window.styled = this.window.styled.default;
              render();
            })            
          })
        })
      })
    })
  }

  componentDidMount() {
    if(Example.babelAdded === false && this.props.isRunnable) {
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
        {this.props.isRunnable && <span className={styles.run} onClick={this.handleRender}>Uruchom w nowym oknie</span>}
      </div>
    )
  }
}