import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Page from './Page.js'
import '../styles/App.scss';
import Header from '../layouts/Header'


class App extends Component {
  previousLocation = this.props.location
  render() {
    return (
      <Router>
        <div className="app-wrapper">
          {<Header />}
          {<Page />}
        </div>

      </Router>
    );
  }
}

export default App;
