import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from './reducers';
import * as initial from './actions/initial';
import HashStorage from './facades/HashStorage';


const loggerMiddleware = createLogger();

const hashStorage = store => next => action => {
    try {
        return next(action);
    } catch (e) {

    } finally {
        if (action.type == 'HANDLE_SKILL_EVENT' && action.event == 'CLICK') {
            const state = store.getState();
            HashStorage.saveSkills(state.skills);
            location.hash = HashStorage.getSkillsHash();
        }
    }
}

export default function configureStore(initialState = {}) {
    const loggerMiddleware = createLogger();

    var middlewares = [
        thunkMiddleware,
        hashStorage,
        // loggerMiddleware
    ];
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

    const store = createStoreWithMiddleware(rootReducer);

    store.dispatch(initial.fetchIcon('json/icon.json'));
    store.dispatch(initial.fetchLangs('json/local.json'));
    store.dispatch(initial.fetchSkills('json/skills.json'));
    store.dispatch(initial.fetchPerks('json/perks.json'));
    store.dispatch(initial.fetchInfamy('json/infamy.json'));

    return store;
}
