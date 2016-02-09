import fetch from 'isomorphic-fetch';
import * as types from '../constants/SkillActionTypes';

export function addSkill(model) {
    return {type: types.ADD_SKILL, model};
}

export function handleSkillEvent(id, event) {
    return {type: types.HANDLE_SKILL_EVENT, id, event};
}

export function fetchSkills(uri) {
    return dispatch => {
        dispatch(fetchSkillsRequest());
        return fetch(uri)
            .then(response => response.json())
            .then(json => {
                dispatch(fetchSkillsSuccess(json))
            });
    };
}

export function fetchSkillsRequest() {
    return {type: types.FETCH_SKILLS};
}

export function fetchSkillsSuccess(response) {
    return {type: types.FETCH_SKILLS, status: 'success', response};
}

export function fetchSkillsError(error) {
    return {type: types.FETCH_SKILLS, status: 'error', error};
}

export function activeSkillTree(id) {
    return {type: types.ACTIVE_SKILL_TREE, id};
}
