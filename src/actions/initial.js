import fetch from 'isomorphic-fetch';
import * as actions from '../constants/SkillAppActions';


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
  return {type: actions.LOAD_LANGS};
}

export function fetchLangsSuccess(response) {
  return {type: actions.LOAD_LANGS, status: 'success', response};
}

export function fetchLangsError(error) {
  return {type: actions.LOAD_LANGS, status: 'error', error};
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
  return {type: actions.LOAD_SKILLS};
}

export function fetchSkillsSuccess(response) {
  return {type: actions.LOAD_SKILLS, status: 'success', response};
}

export function fetchSkillsError(error) {
  return {type: actions.LOAD_SKILLS, status: 'error', error};
}

// =============================================================================
// = Fetch Perks
// =============================================================================
export function fetchPerks(url) {
  return dispatch => {
    dispatch({type: actions.LOAD_PERKS});
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        dispatch({type: actions.LOAD_PERKS, status: 'success', response})
      });
  };
  return {type: actions.LOAD_PERKS, status: 'error', error};
}

// =============================================================================
// = Fetch Infamy
// =============================================================================
export function fetchInfamy(url) {
  return dispatch => {
    dispatch({type: actions.LOAD_INFAMYTREE});
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        dispatch({type: actions.LOAD_INFAMYTREE, status: 'success', response})
      });
  };
  return {type: actions.LOAD_INFAMYTREE, status: 'error', error};
}

// =============================================================================
// = Fetch Icon
// =============================================================================
export function fetchIcon(url) {
  return dispatch => {
    dispatch({type: actions.LOAD_ICON});
    return fetch(url)
      .then(response => response.json())
      .then(response => {
        dispatch({type: actions.LOAD_ICON, status: 'success', response})
      });
  };
  return {type: actions.LOAD_ICON, status: 'error', error};
}
