import * as actions from '../constants/SkillAppActions';

import loadSkills from './loadSkills';
import loadLangs from './loadLangs';
import handleSkills from './handleSkills';

var initialState = {

};

export default function skillApp(state = initialState, action) {
    switch (action.type) {
        case actions.LOAD_SKILLS:
            return Object.assign({}, state, {
                skills: loadSkills(state.skills, action)
            });
        case actions.LOAD_LANGS:
            return Object.assign({}, state, {
                langs: loadLangs(state.langs, action)
            });
        case actions.HANDLE_SKILLS:
            return Object.assign({}, state, {
                skills: handleSkills(state.skills, action)
            });
        case actions.SWITCH_SKILL_TREE:
            return Object.assign({}, state, {
                activedTree: action.id
            });
        default:
            return state;
    }
}
