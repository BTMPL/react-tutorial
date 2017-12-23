import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { HashRouter, Route, Switch, Link } from "react-router-dom";

import Header from "./common/Header/Header";

import Lesson from "./Lessons/Lesson";
import Home from "./Home/Home";

import "./App.less";

class Scroll extends React.Component {

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
  render = () => null;    
}

const render = () => {
  ReactDOM.render(<HashRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/lekcja/:lesson/:section?" component={Lesson} />        
        <Route component={Home} />
      </Switch>
      <Route component={Scroll} />
    </div>
  </HashRouter>, document.getElementById("react-app"));
};

render();

if(module.hot) {
  module.hot.accept();
}
