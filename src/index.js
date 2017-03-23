import React from 'react';
import { render } from 'react-dom';
import Root from './containers/Root';
import Localisation from './public/Localisation';

Localisation.setLocale('tc');

render(
  <Root />,
  document.getElementById('app')
);
