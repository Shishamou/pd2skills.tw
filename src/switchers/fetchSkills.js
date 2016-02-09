import { buildSwitcher } from '../redux-reducer-switcher';
import * as statuses from '../constants/SkillStatuses';
import SkillsBuilder from '../public/SkillsBuilder';

class FetchSkills {

    switcher() {
        return {
            success: this.onSuccess,
            error: this.onError,
            default: this.default,
        };
    }

    onSuccess(state, action) {
        try {
            (new SkillsBuilder(state)).build(action.response);
        } catch (e) {
            console.log(e);
        }
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
}

export default buildSwitcher(FetchSkills).resolve;
