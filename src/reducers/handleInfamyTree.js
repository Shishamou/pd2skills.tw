import InfamyTreeHandler from '../facades/InfamyTreeHandler';
import * as types from '../constants/SkillAppActions';
import * as events from '../constants/Events';

const initialState = Object.assign({
  display: null,
}, InfamyTreeHandler.store);

export default function handleInfamyTree(state = initialState, action) {
  switch (action.type) {
    // 初始化
    case types.INITIALIZE_SUCCESS:
      return loadInfamyTree(state, action);

    // 處理事件
    case types.HANDLE_INFAMY_EVENT:
      return handleInfamyEvent(state, action);

    // 刷新惡名
    case types.REFRESH_INFAMYTREE:
      InfamyTreeHandler.refreshInfamyTree();
      action.skillReduce = InfamyTreeHandler.store.reduced;
      return Object.assign({}, state, InfamyTreeHandler.store);

    default:
      return state;
  }
}

/**
 * 載入惡名
 */
function loadInfamyTree(state = {}, action) {
  var response = action.response.infamy;

  if (typeof response === 'undefined') {
    return state;
  }

  InfamyTreeHandler.initialInfamyTrees(response);
  return Object.assign({}, state, InfamyTreeHandler.store);
}

/**
 * 處理事件
 */
function handleInfamyEvent(state = {}, action) {
  var infamy = InfamyTreeHandler.getInfamy(action.id);

  switch (action.event) {
    case events.CLICK:
      InfamyTreeHandler.handleInfamyClick(infamy.id);
      break;

    case events.REMOVE:
      InfamyTreeHandler.handleInfamyRemove(infamy.id);
      break;

    case events.MOUSE_ENTER:
      return Object.assign({}, state, {
        display: infamy.id
      });

    case events.MOUSE_LEAVE:
    default:
      return state;
  }

  action.skillReduce = InfamyTreeHandler.store.reduced;
  return Object.assign({}, state, InfamyTreeHandler.store, {
    display: state.display
  });
}
