import React from "react";

import { NavLink } from "react-router-dom";

import { Align, Column, Row } from "../common/Layout/Layout";
import Sidebar from "../common/Sidebar/Sidebar";

import Style from "./Lesson.less";

import Lesson1 from "./Lekcja1/Lekcja1";
import Lesson2 from "./Lekcja2/Lekcja2";
import Lesson3 from "./Lekcja3/Lekcja3";


export default class Lesson extends React.Component {
  state = {
    lessonComponent: null
  }

  loadLesson = (lesson) => {
    const fileName = `${lesson.substr(0, 1).toUpperCase()}${lesson.substr(1)}`;
    import(`./${fileName}/${fileName}`).then(data => this.setState({
      lessonComponent: data.default
    }));
  }

  renderIndex = () => {
    return (
      <div>
        {[Lesson1, Lesson2, Lesson3].map(lesson => {
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
    if(!this.state.lessonComponent) {
      return <Row><Column><Align center><p>Wczytywanie ...</p></Align></Column></Row>
    }

    const Component = this.state.lessonComponent;

    return (
      <Row full>
        <div className={Style.sidebar}>
          {this.renderIndex()}
        </div>
        <div className={Style.content}>     
          <Row>
            <Column>
              <Component section={this.props.match.params.section} />
            </Column>
          </Row>
        </div>
      </Row>
    );
  }

  componentDidMount() {
    this.loadLesson(this.props.match.params.lesson);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.match.params.lesson !== this.props.match.params.lesson) {
      this.setState({
        lessonComponent: null
      }, () => this.loadLesson(nextProps.match.params.lesson));
    }
  }
}