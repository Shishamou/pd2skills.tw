import * as types from '../constants/SkillAppActions';
import * as events from '../constants/Events';

export function handleInfamyClick(id) {
  return { type: types.HANDLE_INFAMY_EVENT, event: events.CLICK, id };
}

export function handleInfamyRemove(id) {
  return { type: types.HANDLE_INFAMY_EVENT, event: events.REMOVE, id };
}

export function handleInfamyEnter(id) {
  return { type: types.HANDLE_INFAMY_EVENT, event: events.MOUSE_ENTER, id };
}

export function handleInfamyLeave(id) {
  return { type: types.HANDLE_INFAMY_EVENT, event: events.MOUSE_LEAVE, id };
}
