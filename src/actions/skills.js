import * as types from '../constants/SkillAppActions';
import * as events from '../constants/Events';

export function handleSkillClick(id) {
  return { type: types.HANDLE_SKILL_EVENT, event: events.CLICK, id };
}

export function handleSkillRemove(id) {
  return { type: types.HANDLE_SKILL_EVENT, event: events.REMOVE, id };
}

export function handleSkillEnter(id) {
  return { type: types.HANDLE_SKILL_EVENT, event: events.MOUSE_ENTER, id };
}

export function handleSkillLeave(id) {
  return { type: types.HANDLE_SKILL_EVENT, event: events.MOUSE_LEAVE, id };
}

export function activeSkillTree(id) {
  return { type: types.SWITCH_SKILL_TREE, id };
}

export function respecSkillTree(id) {
  return { type: types.RESPEC_SKILL_TREE, id };
}
