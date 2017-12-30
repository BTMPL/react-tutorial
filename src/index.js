import React from "react";
//import ReactDOM from "react-dom";
import { render as renderToDom } from 'react-snapshot';
import PropTypes from "prop-types";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import Header from "./common/Header/Header";

import Lesson from "./Lessons/Lesson";
import Home from "./Home/Home";

import "./App.less";

class Scroll extends React.Component {

  static propTypes = {
    location: PropTypes.shape({
      pathname: PropTypes.string
    }),
    navChangeCallback: PropTypes.func,
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      try {
        ga('set', 'page', this.props.location.pathname);
        ga('send', 'pageview');
      }
      catch(e) {
        
      }

      this.props.navChangeCallback();
    }
  }
  render = () => null;    
}

class App extends React.Component {
  state = {
    navbarOpen: false
  }

  toggleNavbar = () => this.setState({ navbarOpen: !this.state.navbarOpen });
  closeSidebar = () => {
    this.setState({ navbarOpen: false });
  }

  render() {
    return (
      <BrowserRouter>
        <div className={this.state.navbarOpen ? 'navbar' : ''}>
          <Route path="/" exact render={() => <Header />} />
          <Route path="/lekcja" render={() => <Header onNavbarToggle={this.toggleNavbar} />} />
          <Switch>
            <Route path="/lekcja/:lesson/:section?" component={Lesson} />
            <Route component={Home} />
          </Switch>
          <Route render={(props) => <Scroll {...props} navChangeCallback={this.closeSidebar} />} />
        </div>
      </BrowserRouter>
    )    
  }
}

const render = () => {
  renderToDom(<App />, document.getElementById("react-app"));
};

render();

if(module.hot) {
  module.hot.accept();
}
