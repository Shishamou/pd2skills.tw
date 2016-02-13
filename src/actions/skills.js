import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';

export function addSkill(model) {
    return {type: types.ADD_SKILL, model};
}

export function handleSkillEvent(id, event) {
    return {type: types.HANDLE_SKILL_EVENT, id, event};
}

export function activeSkillTree(id) {
    return {type: types.ACTIVE_SKILL_TREE, id};
}
