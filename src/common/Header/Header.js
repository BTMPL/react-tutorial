import React from "react";
import { createPortal } from "react-dom";

import PropTypes from "prop-types";

import { Switch, Route, NavLink, Link } from "react-router-dom";
import { Row, Column, Align } from "../Layout/Layout";

import Style from "./Header.less";

export default class Header extends React.Component {

  static propTypes = {
    onNavbarToggle: PropTypes.func
  }

  render() {
    return (
      <header className={Style.header}>
        <Row full>
          <Column width={6}>
            <img src="https://github.com/btmpl.png" alt="" className={Style.avatar} /> szczecinski.eu
          </Column>
          <Column width={6}>        
            <Align right>
              <NavLink to="/" exact>Home</NavLink>
              <a href="https://medium.com/@baphemot" target="_blank">Blog</a>
              <Link to="/lekcja/lekcja1/podstawowe-pojecia" strict="true">Kurs React</Link>
              <a href="mailto:baphemot@gmail.com">Kontakt</a>

              {this.props.onNavbarToggle && <span className={Style.mobileMenu} onClick={this.props.onNavbarToggle} />}
            </Align>
          </Column>
        </Row>
      </header>
    )
  }
}