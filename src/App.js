import React, { Component } from 'react';
import {Provider} from 'react-redux';
import reducers from './reducers/main'
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger'
import './App.css';
import MADLIB_TEXT from './madlibs/bill-of-rights';
import MadlibForm from './components/MadlibForm';

const store = createStore(reducers, applyMiddleware(logger));


class App extends Component {
  render() {
    return (
      <Provider store={store}>
          <MadlibForm madlib={MADLIB_TEXT} />
      </Provider>);
  }
}

export default App;
