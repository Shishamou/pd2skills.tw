import { buildReducer } from '../redux-reducer-switcher';
import * as types from '../constants/ActionTypes';

import handleSkillEvent from '../switchers/handleSkillEvent';
import fetchLangs from '../switchers/fetchLangs';
import fetchSkills from '../switchers/fetchSkills';

class Skills
{
    switcher() {
        return {
            [types.FETCH_LANGS]: (state, action) => fetchLangs(action.status)(state, action),
            [types.FETCH_SKILLS]: (state, action) => fetchSkills(action.status)(state, action),
            [types.HANDLE_SKILL_EVENT]: (state, action) => handleSkillEvent(action.event)(state, action),
            [types.ACTIVE_SKILL_TREE]: (state, action) => {state.activedTree = action.id}
        };
    }
}

export default buildReducer(Skills, {
    displayInformation: {}
});
