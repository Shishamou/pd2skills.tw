import fetch from 'isomorphic-fetch';
import * as actions from '../constants/SkillAppActions';

export function handleSkillEvent(id, event) {
    return {type: actions.HANDLE_SKILLS, id, event};
}

export function activeSkillTree(id) {
    return {type: actions.SWITCH_SKILL_TREE, id};
}
