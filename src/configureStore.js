import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import { fetchLangs, fetchSkills } from './actions/initial';

const loggerMiddleware = createLogger();

export default function configureStore(initialState = {}) {
    const loggerMiddleware = createLogger();

    var middlewares = [
        thunkMiddleware,
        // loggerMiddleware
    ];
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

    const store = createStoreWithMiddleware(rootReducer);

    store.dispatch(fetchLangs('local.json'));
    store.dispatch(fetchSkills('skills.json'));

    return store;
}
