import React from "react";
import { createPortal } from "react-dom";

import { Switch, Route, NavLink, Link } from "react-router-dom";
import { Row, Column, Align } from "../Layout/Layout";

import Style from "./Header.less";

class LessonTitle extends React.PureComponent {

  state = {
    title: undefined
  }

  loadLesson = (lesson) => {
    const fileName = `${lesson.substr(0, 1).toUpperCase()}${lesson.substr(1)}`;
    import(`../../lessons/${fileName}/${fileName}`).then(data => this.setState({
      title: data.title
    }));    
  }

  componentDidMount() {
    this.loadLesson(this.props.match.params.lesson);
  }

  componentDidUpdate(prevProps) {
    console.log('lesson', this.props.match.params.lesson);
    if(prevProps.match.params.lesson !== this.props.match.params.lesson) {
      this.loadLesson(this.props.match.params.lesson);
    }
  }

  render() {
    if(this.state.title) return this.state.title

    return null;
  }
}

export default class Header extends React.Component {

  render() {
    return (
      <header className={Style.header}>
        <Row>
          <Column width={6}>
            <Switch>
              <Route path="/lekcja/:lesson" component={LessonTitle} />
              <Route render={() => "React"} />
            </Switch>
          </Column>
          <Column width={6}>        
            <Align right>
              <NavLink to="/" exact>O kursie</NavLink>
              <Link to="/lekcja/intro" strict>Start</Link>
            </Align>
          </Column>
        </Row>
      </header>
    )
  }

  componentDidUpdate() {
    console.log('hi');
  }
}