import React from "react";
import { createPortal } from "react-dom";

import { Switch, Route, NavLink, Link } from "react-router-dom";
import { Row, Column, Align } from "../Layout/Layout";

import Style from "./Header.less";

export default class Header extends React.Component {

  render() {
    return (
      <header className={Style.header}>
        <Row full>
          <Column width={6}>
            szczecinski.eu
          </Column>
          <Column width={6}>        
            <Align right>
              <NavLink to="/" exact>Home</NavLink>
              <a href="https://medium.com/@baphemot" target="_blank">Blog</a>
              <Link to="/lekcja/lekcja1/podstawowe-pojecia" strict="true">Kurs React</Link>
            </Align>
          </Column>
        </Row>
      </header>
    )
  }
}