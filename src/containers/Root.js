import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import { fetchLangs, fetchSkills } from '../actions/initial';

import App from './App.js';

const store = configureStore();

export default class Root extends Component
{
  constructor(prop) {
    super(prop);
  }

  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
