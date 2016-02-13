import { buildSwitcher } from '../redux-reducer-switcher';
import Localisation from '../public/Localisation';

class FetchLangs {
    switcher() {
        return {
            success: this.onSuccess,
            error: this.onError,
            default: this.default,
        };
    }

    onSuccess(state, action) {
        Localisation.addLangs(action.response);
        state.langs = Localisation.langs;
        return state;
    }

    onError(state, action) {
        throw '讀取語言檔失敗: ' + action.error;
        return state;
    }

    default(state, action) {
        state.langs = {};
        return state;
    }
}

export default buildSwitcher(FetchLangs).resolve;
