import React from "react";
import { createPortal } from "react-dom";

import { Switch, Route, NavLink, Link } from "react-router-dom";
import { Row, Column, Align } from "../Layout/Layout";

import Style from "./Header.less";

export default class Header extends React.Component {

  render() {
    return (
      <header className={Style.header}>
        <Row>
          <Column width={6}>
            [logo]
          </Column>
          <Column width={6}>        
            <Align right>
              <NavLink to="/" exact>O kursie</NavLink>
              <Link to="/lekcja/intro" strict="true">Start</Link>
            </Align>
          </Column>
        </Row>
      </header>
    )
  }
}