import { combineReducers } from 'redux';
import * as types from './constants/SkillAppActions';

import other from './reducers/other';
import loadLangs from './reducers/loadLangs';
import handleSkills from './reducers/handleSkills';
import handlePerks from './reducers/handlePerks';
import handleInfamyTree from './reducers/handleInfamyTree';

export default combineReducers({
    other: other,
    display: handleDisplay,
    langs: loadLangs,
    infamy: handleInfamyTree,
    skills: handleSkills,
    perks: handlePerks
});

function handleDisplay(state = 0, action) {
    switch (action.type) {
        case types.SWITCH_MAIN_TAB:
            return action.name;
        default:
            return state;
    }
}
