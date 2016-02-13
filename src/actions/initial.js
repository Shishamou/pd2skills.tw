import fetch from 'isomorphic-fetch';
import * as types from '../constants/ActionTypes';


// =============================================================================
// = Fetch langs
// =============================================================================
export function fetchLangs(url) {
    return dispatch => {
        dispatch(fetchLangsRequest());
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                dispatch(fetchLangsSuccess(json))
            });
    };
}

export function fetchLangsRequest() {
    return {type: types.FETCH_LANGS};
}

export function fetchLangsSuccess(response) {
    return {type: types.FETCH_LANGS, status: 'success', response};
}

export function fetchLangsError(error) {
    return {type: types.FETCH_LANGS, status: 'error', error};
}


// =============================================================================
// = Fetch skills
// =============================================================================
export function fetchSkills(url) {
    return dispatch => {
        dispatch(fetchSkillsRequest());
        return fetch(url)
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
