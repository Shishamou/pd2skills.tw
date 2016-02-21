import { combineReducers } from 'redux';
import * as types from './constants/SkillAppActions';
import loadLangs from './reducers/loadLangs';
import handleSkills from './reducers/handleSkills';
import handleInfamyTree from './reducers/handleInfamyTree';

export default function rootReducer(state = {}, action) {
    switch (action.type) {
        case types.LOAD_LANGS:
            return Object.assign({}, state, {
                langs: loadLangs(state.langs, action)
            });

        case types.LOAD_INFAMYTREE:
        case types.HANDLE_INFAMY_EVENT:
            return Object.assign({}, state, {
                infamy: handleInfamyTree(state.infamy, action),
                skills: handleSkills(state.skills, action)
            });
        case types.LOAD_SKILLS:
        case types.HANDLE_SKILL_EVENT:
        case types.SWITCH_SKILL_TREE:
        case types.RESPEC_SKILL_TREE:
            return Object.assign({}, state, {
                skills: handleSkills(state.skills, action)
            });

        default:
            return state;
    }
}

var rootReducer = combineReducers({
    langs: loadLangs,
    skills: handleSkills,
})
