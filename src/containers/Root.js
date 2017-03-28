import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import App from './App.js';

export default class Root extends Component
{
  constructor(prop) {
    super(prop);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <App />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired
};