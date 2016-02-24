import { combineReducers } from 'redux';
import * as types from './constants/SkillAppActions';

import loadLangs from './reducers/loadLangs';
import handleSkills from './reducers/handleSkills';
import handlePerks from './reducers/handlePerks';
import handleInfamyTree from './reducers/handleInfamyTree';

function rootReducer(state = {}, action) {
    return Object.assign({}, state, {
        display: handleDisplay,
        langs: loadLangs(state.langs, action),
        infamy: handleInfamyTree(state.infamy, action),
        skills: handleSkills(state.skills, action),
        perks: handlePerks(state.perks, action)
    });
}

function handleDisplay(state = 0, action) {
    switch (action.type) {
        case types.SWITCH_MAIN_TAB:
            return action.name;
        default:
            return state;
    }
}

var rootReducer = combineReducers({
    display: handleDisplay,
    langs: loadLangs,
    infamy: handleInfamyTree,
    skills: handleSkills,
    perks: handlePerks
});

export default rootReducer;
