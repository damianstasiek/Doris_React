import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Page from './Page.js'
import '../styles/App.css';
import Header from '../layouts/Header'


class App extends Component {
  previousLocation = this.props.location
  render() {
    return (
      <Router>
        <div className="app-wrapper">
          {<Header />}
          <section className="section-wrapper">
            {<Page />}
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
