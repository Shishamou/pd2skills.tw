import { buildReducer } from '../redux-reducer-switcher';
import * as types from '../constants/SkillActionTypes';

import handleSkillEvent from '../switchers/handleSkillEvent';
import fetchSkills from '../switchers/fetchSkills';

class Skills
{
    switcher() {
        return {
            [types.HANDLE_SKILL_EVENT]: (state, action) => handleSkillEvent(action.event)(state, action),
            [types.FETCH_SKILLS]: (state, action) => fetchSkills(action.status)(state, action),
            [types.ACTIVE_SKILL_TREE]: (state, action) => {state.activedTree = action.id}
        };
    }
}

export default buildReducer(Skills, {
    activedTree: 0,
    trees: [],
    tiers: [],
    skills: []
});
