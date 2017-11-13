import React from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Row, Column, Align } from "../Layout/Layout";

import Style from "./Navigate.less";

export default class Navigate extends React.Component {

  static propTypes = {
    prev: PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string
    }),
    next: PropTypes.shape({
      url: PropTypes.string,
      title: PropTypes.string
    })
  }

  render() {
    return (
      <Row className={Style.Navigate}>
        <Column width={6} mobileWidth={6}>
          <Align left>
            {this.props.prev && <Link to={this.props.prev.url}>{this.props.prev.title}</Link>}
          </Align>        
        </Column>
        <Column width={6} mobileWidth={6}>
          <Align right>
            {this.props.next && <Link to={this.props.next.url}>{this.props.next.title}</Link>}
          </Align>          
        </Column>
      </Row>
    )
  }
}