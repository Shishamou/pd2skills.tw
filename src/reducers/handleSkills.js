import SkillsHandler from '../public/SkillsHandler';
import * as actions from '../constants/SkillAppActions';
import * as events from '../constants/Events';

var initialState = {
    trees: [],
    tiers: [],
    skills: [],
    displayInformation: {}
};


export default function handleSkill(state = initialState, action) {
    switch (action.type) {
        case actions.LOAD_SKILLS:
            return loadSkills(state, action);
        case actions.HANDLE_SKILL_EVENT:
            return handleSkillEvent(state, action);
        default:
            return state;
    }
}

function loadSkills(state = {}, action) {
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

function handleSkillEvent(state = {}, action) {
    var skill = SkillsHandler.getSkill(action.id);

    switch (action.event) {
        case events.CLICK:
            SkillsHandler.handleSkillClick(skill.id);
            break;

        case events.REMOVE:
            SkillsHandler.handleSkillRemove(skill.id);
            break;

        case events.MOUSE_ENTER:
            var hover = true;
        case events.MOUSE_LEAVE:
            if (hover) {
                state.displayInformation = { skill: skill.id };
            }

            // 更新前置技能
            if (skill.requiredSkill) {
                var requiredSkill = SkillsHandler.getSkillByName(skill.requiredSkill, true);
                requiredSkill.alerted = (requiredSkill.ownedBasic || ( ! hover))
                    ? false
                    : hover;
            }

            SkillsHandler.updateTreeState(skill.treeId);
            break;

        default:
            return state;
    }

    return Object.assign({}, state, {
        trees: SkillsHandler.store.trees.slice(),
        tiers: SkillsHandler.store.tiers.slice(),
        skills: SkillsHandler.store.skills.slice(),
        displayInformation: Object.assign({}, state.displayInformation)
    });
}
