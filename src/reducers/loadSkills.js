import SkillsHandler from '../public/SkillsHandler';

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
            SkillsHandler.initialSkillTrees(action.response);
            return Object.assign({}, state, SkillsHandler.store);

        case 'error':
            throw '讀取技能檔案失敗: ' + action.error;
            return state;

        default:
            return initialState;
    }
}
