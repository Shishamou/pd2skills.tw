import { buildSwitcher } from '../redux-reducer-switcher';
import * as statuses from '../constants/SkillStatuses';

class FetchSkills {
    switcher() {
        return {
            success: this.onSuccess,
            error: this.onError,
            default: this.default,
        };
    }

    onSuccess(state, action) {
        state.skills = action.response.skills.map(skill => this.buildSkill(skill));
        return state;
    }

    onError(state, action) {
        console.log('Fetch skills failed: ' + action.error);
        return state;
    }

    default(state, action) {
        state.tiers = [];
        state.skills = [];
        return state;
    }

    // =========================================================================
    // = Factory
    // =========================================================================

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
}

export default buildSwitcher(FetchSkills).resolve;
