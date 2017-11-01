import React from "react";

import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { Row, Column, Align } from "../Layout/Layout";

import Style from "./Navigate.less";

export default class Navigate extends React.Component {

  static propTypes = {
    prev: PropTypes.string,
    next: PropTypes.string
  }

  render() {
    return (
      <Row className={Style.Navigate}>
        <Column width={6} mobileWidth={6}>
          <Align center>
            {this.props.prev && <Link to={this.props.prev}>Poprzednia sekcja</Link>}
          </Align>        
        </Column>
        <Column width={6} mobileWidth={6}>
          <Align center>
            {this.props.next && <Link to={this.props.next}>Następna sekcja</Link>}
          </Align>          
        </Column>
      </Row>
    )
  }
}