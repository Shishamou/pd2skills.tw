import { buildReducer } from '../redux-reducer-switcher';
import * as types from '../constants/SkillActionTypes';
import handleSkillEvent from './handleSkillEvent';
import fetchSkills from './fetchSkills';

class Skills
{
    switcher() {
        return {
            [types.ADD_SKILL]: this.addSkill,
            [types.HANDLE_SKILL_EVENT]: (state, action) => handleSkillEvent(action.event)(state, action),
            [types.FETCH_SKILLS]: (state, action) => fetchSkills(action.status)(state, action),
        };
    }
}

export default buildReducer(Skills, {
    trees: [],
    tiers: [],
    skills: []
});
