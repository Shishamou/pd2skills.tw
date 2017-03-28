import HashStorage from './services/HashStorage';
import * as types from './constants/SkillAppActions';
import * as events from './constants/Events';

var storage = new HashStorage;
storage.load(() => location.hash.replace('#/', ''));

const middleware = store => next => action => {
  var result = next(action);

  const state = store.getState();
  const inArray = (search, array) => (array.indexOf(search) >= 0);
  const refresh = (actionType) => {
    var action = {};
    action.type = actionType;
    result = next(action);
  }

  switch (action.type) {
    case types.HANDLE_SKILL_EVENT:
      if (inArray(action.event, [ events.MOUSE_ENTER, events.MOUSE_LEAVE ])) {
        return result;
      }
    case types.RESPEC_SKILL_TREE:
      storage.saveSkills(state.skills);
      break;

    case types.HANDLE_PERK_EVENT:
    case types.HANDLE_DECK_EVENT:
      storage.savePerks(state.perks);
      break;

    case types.HANDLE_INFAMY_EVENT:
      storage.saveInfamy(state.infamy);
      break;

    case types.INITIALIZE_SUCCESS:
      initialize(state, action, refresh);
      break;

    default:
      return result;
  }

  storage.save((hash) => location.hash = '/' + hash);
  return result;
}

/**
 * 初始化
 */
function initialize(state, action, refresh) {
  var response = action.response;

  if (response.infamy) {
    storage.loadInfamy(state.infamy);
  }

  if (response.skills) {
    storage.loadSkills(state.skills);
  }

  if (response.perks) {
    storage.loadPerks(state.perks);
  }

  refresh(types.REFRESH_INFAMYTREE);
  refresh(types.REFRESH_SKILLS);
  refresh(types.REFRESH_PERKS);
}

export default middleware;
