import { buildReducer } from '../redux-reducer-switcher';
import * as types from '../constants/SkillActionTypes';
import * as statuses from '../constants/SkillStatuses';
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
    addSkill(state, action) {
        state.skills.push(this.buildSkill(action.model));
        return state;
    }

    buildSkill(model) {
        return {
            tier_id: model.tier_id || 0,
            name: model.name || '',
            text_basic: model.text_basic || '',
            text_ace: model.text_ace || '',
            required_skill: model.required_skill || null,
            own_basic: false,
            own_ace: false,
            unlock_basic: false,
            unlock_ace: false,
            alert: false,
            status: statuses.STATUS_LOCKED
        };
    }

    handleSkillEvent(state, action) {
        var self = this;
        state.skills = state.skills.map((skill, index) => {
            if (index !== action.id) return skill;

            handleSkillEvent(action.event)(skill);

            self.updateStatus(skill);
            return skill;
        });

        return state;
    }

    updateStatus(skill) {
        skill.status = (function(skill) {
            if (skill.alert) return statuses.STATUS_ALERTED;
            if (skill.own_ace) return statuses.STATUS_ACED;
            if (skill.own_basic) return statuses.STATUS_OWNED;
            if (skill.unlock_basic) return statuses.STATUS_UNLOCKED;
            return statuses.STATUS_LOCKED;
        })(skill);
    }

    handleFetchSkills(state, action) {
        switch (action.status) {
            case 'success':
                state.skills = action.response.skills.map(skill => {
                    return this.buildSkill(skill);
                });
                break;
            case 'error':
                break;
            default:
                state.skills = [];
        }

        return state;
    }
}

export default buildReducer(Skills, {
    trees: [],
    tiers: [],
    skills: []
});
