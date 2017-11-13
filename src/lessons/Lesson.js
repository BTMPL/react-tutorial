import React from "react";

import { Align, Column, Row } from "../common/Layout/Layout";
import Sidebar from "../common/Sidebar/Sidebar";

import Style from "./Lesson.less";

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

  render() {
    if(!this.state.lessonComponent) {
      return <Row><Column><Align center><p>Wczytywanie ...</p></Align></Column></Row>
    }

    const Component = this.state.lessonComponent;

    return (
      <div>
        <div className={Style.sidebar}>
          <Sidebar />         
        </div>      
        <Row>
          <Column>
            <Component section={this.props.match.params.section} />
          </Column>
        </Row>
      </div>
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