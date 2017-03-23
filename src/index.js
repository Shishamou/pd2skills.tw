import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';

import Localisation from './public/Localisation';
import configureStore from './configureStore';

const element = document.getElementById('app');

const store = configureStore(element.getAttribute('data-src'));
Localisation.setLocale(element.getAttribute('data-local') || 'tc');

render(
  <Root store={store} />,
  element
);
