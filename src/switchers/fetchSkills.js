import { buildSwitcher } from '../redux-reducer-switcher';
import SkillsBuilder from '../public/SkillsBuilder';
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
        (new SkillsBuilder(state)).build(action.response);
        return state;
    }

    onError(state, action) {
        throw '讀取技能檔案失敗: ' + action.error;
        return state;
    }

    default(state, action) {
        state.trees = [];
        state.tiers = [];
        state.skills = [];
        return state;
    }
}

export default buildSwitcher(FetchSkills).resolve;
