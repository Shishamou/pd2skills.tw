import SkillsBuilder from '../public/SkillsBuilder';

var initialState = {
    trees: [],
    tiers: [],
    skills: [],
    displayInformation: {}
};

export default function loadSkills(state = initialState, action) {
    switch (action.status) {
        case 'success':
            var store = {};
            (new SkillsBuilder(store)).build(action.response);
            return Object.assign({}, state, store);

        case 'error':
            throw '讀取技能檔案失敗: ' + action.error;
            return state;

        default:
            return initialState;
    }
}
