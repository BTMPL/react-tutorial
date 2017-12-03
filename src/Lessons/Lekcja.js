import React from "react";
import PropTypes from "prop-types";

export default class Lekcja extends React.Component {

  static propTypes = {
    section: PropTypes.string
  }


  getPrev = (currentUrl) => {
    const index = this.__proto__.constructor.getSections().findIndex((item => {
      const split = item.url.split('/');
      return split[split.length - 1] === currentUrl;
    }));
    if(index === 0) {
      return;
    }
    return this.__proto__.constructor.getSections()[index - 1];
  }

  getNext = (currentUrl) => {
    const index = this.__proto__.constructor.getSections().findIndex((item => {
      const split = item.url.split('/');
      return split[split.length - 1] === currentUrl;
    }));
    if(index + 1 === this.__proto__.constructor.getSections().length) {
      return;
    }
    return this.__proto__.constructor.getSections()[index + 1];
  }  

  render() {
    if(this.props.section) {
      const section = 'render' + this.props.section.split('-').reduce((acc, item, index) => {
        return acc.concat(`${item.substr(0, 1).toUpperCase()}${item.substr(1)}`);
      }, []).join('')
      return this[section]();
    }
  }  
}