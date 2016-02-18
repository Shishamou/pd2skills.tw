import Localisation from '../public/Localisation';

var initialState = {};

export default function loadLangs(state = initialState, action) {
    switch (action.status) {
        case 'success':
            Localisation.addLangs(action.response);
            return Object.assign({}, Localisation.langs);

        case 'error':
            throw '讀取語言檔失敗: ' + action.error;
            return state;

        default:
            return initialState;
    }
}
