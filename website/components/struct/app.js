import React, { Component } from 'react';

import Header from './header';
import Nav from './nav';
import Aside from './aside';
import Main from './main';
import Footer from './footer';

import './app.module.css';

class App extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Header />
        <Nav />
        <Aside />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default App;
