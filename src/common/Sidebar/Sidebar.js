import React from "react";
import { NavLink } from "react-router-dom";

import Style from "./Sidebar.less";

export default class Sidebar extends React.Component {

  state = {
    lessons: [
      {
        title: "Intro",
        url: "intro",
        sections: []
      },
      {
        title: "Lesson 1",
        url: "lesson1",
        sections: [
          {
            title: "Podstawowe pojęcia",
            url: "lesson1/pojecia"
          },
          {
            title: "Środowisko pracy",
            url: "lesson1/srodowisko-pracy"
          }
        ]
      }
    ]
  }

  toLink = (item) => {
    return (
      <li key={item.url}>
        <NavLink to={`/lekcja/${item.url}`}>{item.title}</NavLink>
        {item.sections && <ul>{item.sections.map(sub => this.toLink(sub))}</ul>}
      </li>    
    );
  }

  render() {
    return (
      <ul className={Style.menu}>
        {this.state.lessons.map(item => {
          return this.toLink(item)
        })}
      </ul>
    )
  }
}