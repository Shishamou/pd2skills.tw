import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import skillApp from './reducers/skills';
import { addSkill, fetchSkills } from './actions/skills';
import '../assets/style.less';


const loggerMiddleware = createLogger();

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore)

const store = createStoreWithMiddleware(skillApp);

store.dispatch(fetchSkills('public/skills.json'));

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
);
