import * as types from './constants/SkillAppActions';

import loadLangs from './reducers/loadLangs';
import handleSkills from './reducers/handleSkills';

var initialState = {

};

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_LANGS:
            return Object.assign({}, state, {
                langs: loadLangs(state.langs, action)
            });
        case types.LOAD_SKILLS:
        case types.HANDLE_SKILL_EVENT:
        case types.SWITCH_SKILL_TREE:
            return Object.assign({}, state, {
                skills: handleSkills(state.skills, action)
            });
        default:
            return state;
    }
}
