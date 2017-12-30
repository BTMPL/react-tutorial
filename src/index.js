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
    }),
    navChangeCallback: PropTypes.func,
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      ga('set', 'page', this.props.location.pathname);
      ga('send', 'pageview');

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
      <HashRouter>
        <div className={this.state.navbarOpen ? 'navbar' : ''}>
          <Route path="/" exact render={() => <Header />} />
          <Route path="/lekcja" render={() => <Header onNavbarToggle={this.toggleNavbar} />} />
          <Switch>
            <Route path="/lekcja/:lesson/:section?" component={Lesson} />
            <Route component={Home} />
          </Switch>
          <Route render={(props) => <Scroll {...props} navChangeCallback={this.closeSidebar} />} />
        </div>
      </HashRouter>
    )    
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById("react-app"));
};

render();

if(module.hot) {
  module.hot.accept();
}
