import Localisation from '../public/Localisation';
import * as types from '../constants/SkillAppActions';

var initialState = {};

export default function handleLangs(state = initialState, action) {
    switch (action.type) {
        // 初始化
        case types.INITIALIZE_SUCCESS:
            return loadLangs(state, action);

        default:
            return state;
    }
}

/**
 * 載入語系檔
 */
function loadLangs(state = initialState, action) {
    var response = action.response.localization;

    if (typeof response === 'undefined') {
        return state;
    }

    Localisation.addLangs(response);
    return Object.assign({}, Localisation.langs);
}
