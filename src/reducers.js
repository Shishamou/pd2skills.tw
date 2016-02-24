import { combineReducers } from 'redux';
import * as types from './constants/SkillAppActions';

import loadLangs from './reducers/loadLangs';
import handleSkills from './reducers/handleSkills';
import handlePerks from './reducers/handlePerks';
import handleInfamyTree from './reducers/handleInfamyTree';

export default function rootReducer(state = {}, action) {
    return Object.assign({}, state, {
        display: action.name,
        langs: loadLangs(state.langs, action),
        infamy: handleInfamyTree(state.infamy, action),
        skills: handleSkills(state.skills, action),
        perks: handlePerks(state.perks, action)
    });
}

var rootReducer = combineReducers({
    langs: loadLangs,
    skills: handleSkills,
})
