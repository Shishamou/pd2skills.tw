import { buildReducer } from '../redux-reducer-switcher';
import * as types from '../constants/SkillActionTypes';
import handleSkillEvent from './handleSkillEvent';
import fetchSkills from './fetchSkills';

class Skills
{
    switcher() {
        return {
            [types.ADD_SKILL]: this.addSkill,
            [types.HANDLE_SKILL_EVENT]: this.handleSkillEvent,
            [types.FETCH_SKILLS]: (state, action) => fetchSkills(action.status)(state, action),
        };
    }

    // =========================================================================
    // =
    // =========================================================================

    handleSkillEvent(state, action) {
        var self = this;
        state.skills = state.skills.map((skill, index) => {
            if (index !== action.id) return skill;

            handleSkillEvent(action.event)(skill);
            return skill;
        });

        return state;
    }
}

export default buildReducer(Skills, {
    trees: [],
    tiers: [],
    skills: []
});
