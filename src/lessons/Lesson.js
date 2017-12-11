import React from "react";

import { NavLink } from "react-router-dom";

import { Align, Column, Row } from "../common/Layout/Layout";

import Style from "./Lesson.less";

import Lesson1 from "./Lekcja1/Lekcja1";
import Lesson2 from "./Lekcja2/Lekcja2";
import Lesson3 from "./Lekcja3/Lekcja3";
import Lesson4 from "./Lekcja4/Lekcja4";

const lessons = {
  lekcja1: Lesson1,
  lekcja2: Lesson2,
  lekcja3: Lesson3,
  lekcja4: Lesson4
};


export default class Lesson extends React.Component {

  renderIndex = () => {
    return (
      <div>
        {[Lesson1, Lesson2, Lesson3, Lesson4].map(lesson => {
          return (
            <ul key={lesson.title}>            
              <li key={lesson.title} className="lesson">{lesson.title}</li>
              {
                lesson.getSections().map((item, index) => {
                  return <li key={item.title}><NavLink to={item.url}>{index+1}) {item.title}</NavLink></li>
                })
              }
            </ul>     
          );
        })}
      </div>
    )
  }

  render() {
    const Component = lessons[this.props.match.params.lesson];

    return (
      <Row full className={Style.lesson}>
        <Column width={3} className={Style.sidebar}>
          {this.renderIndex()}
        </Column>
        <Column width={9} className={Style.content}>     
          <Row>
            <Column>
              <Component section={this.props.match.params.section} />
            </Column>
          </Row>
        </Column>
      </Row>
    );
  }
}