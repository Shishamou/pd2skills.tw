import PerksHandler from '../facades/PerksHandler';
import * as types from '../constants/SkillAppActions';
import * as events from '../constants/Events';

const initialState = Object.assign({
  activedPerk: null,
  display: null,
}, PerksHandler.store);

export default function handlePerks(state = initialState, action) {
  switch (action.type) {
    // 初始化
    case types.INITIALIZE_SUCCESS:
      return loadPerks(state, action);

    // 處理天賦事件
    case types.HANDLE_PERK_EVENT:
      return handlePerkEvent(state, action);

    // 處理牌組事件
    case types.HANDLE_DECK_EVENT:
      return handleDeckEvent(state, action);

    // 刷新天賦
    case types.REFRESH_PERKS:
      PerksHandler.refresh();
      return Object.assign({}, state, PerksHandler.store, {
        activedPerk: PerksHandler.getEquippedPerk()
      });

    // 切換天賦
    case types.SWITCH_PERK:
      return Object.assign({}, state, {
        activedPerk: action.id
      });

    // 重置天賦
    case types.RESPEC_PERK:
      PerksHandler.respec(action.id);
      return Object.assign({}, state, PerksHandler.store);

    default:
      return state;
  }
}

/**
 * 載入天賦
 */
function loadPerks(state = {}, action) {
  var response = action.response.perks;

  if (typeof response === 'undefined') {
    return state;
  }

  PerksHandler.initialPerks(response);
  return Object.assign({}, state, PerksHandler.store);
}

/**
 * 處理天賦事件
 */
function handlePerkEvent(state = {}, action) {
  var perk = action.id;

  switch (action.event) {
    case events.CLICK:
      return Object.assign({}, state, {
        activedPerk: perk
      });
    case events.DOUBLE_CLICK:
      PerksHandler.equipPerk(perk);
      break;

    case events.REMOVE:
      PerksHandler.respec(perk);
      break;

    default:
      return state;
  }

  return Object.assign({}, state, PerksHandler.store, {
    perks: PerksHandler.store.perks.slice(),
  });
}

/**
 * 處理牌組事件
 */
function handleDeckEvent(state = {}, action) {
  var deckId = action.id;

  switch (action.event) {
    case events.CLICK:
      PerksHandler.handleDeckClick(deckId);
      return Object.assign({}, state, PerksHandler.store, {
        perks: PerksHandler.store.perks.slice(),
        decks: PerksHandler.store.decks.slice(),
        display: state.display
      });

    case events.MOUSE_ENTER:
      var hover = true;
    case events.MOUSE_LEAVE:
      if (hover) {
        state.display = deckId;
      }

      return Object.assign({}, state, {
        display: state.display
      });

    default:
      return state;
  }
}
