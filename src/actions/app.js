import fetch from 'isomorphic-fetch';
import * as types from '../constants/SkillAppActions';

export function switchMainTab(name) {
    return { type: types.SWITCH_MAIN_TAB, name };
}

export function initialize(url) {
    return dispatch => {
        dispatch(initializeRequest());
        return fetch(url)
            .then(response => response.json())
            .then(json => {
                dispatch(initializeSuccess(json))
            });
    };
}

export function initializeRequest() {
    return { type: types.INITIALIZE };
}

export function initializeSuccess(response) {
    return { type: types.INITIALIZE_SUCCESS, response };
}

export function initializeError(error) {
    return { type: types.INITIALIZE_FAIL, error };
}
