import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import Page from './Page.js'
import '../styles/App.scss';
import Header from '../layouts/Header'
import Footer from './Footer.js';


class App extends Component {
  previousLocation = this.props.location
  render() {
    return (
      <Router>
        <div className="app-wrapper">
          {<Header />}
          {<Page />}
          {<Footer />}
        </div>

      </Router>
    );
  }
}

export default App;
