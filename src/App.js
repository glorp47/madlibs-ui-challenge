import React, { Component } from 'react';
import './App.css';
import MADLIB_TEXT from './madlibs/bill-of-rights';
import MadlibForm from './components/MadlibForm';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Flocabulary Mad Libs!</h1>
        <MadlibForm madlib={MADLIB_TEXT} />
      </div>
    );
  }
}

export default App;
