import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import About from './About';
import ProjectsList from './PorjectsList';
import Contact from './Contact';
import '../styles/App.css';
import Header from '../layouts/Header'


class App extends Component {
  render() {
    return (
      <Router>
        <div className="app-wrapper">
          <header className="header">
            {<Header />}
          </header>
          <section className="section-wrapper">
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/projects" component={ProjectsList} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </section>
        </div>
      </Router>
    );
  }
}

export default App;
