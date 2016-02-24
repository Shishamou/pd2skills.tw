import * as types from '../constants/SkillAppActions';
import * as events from '../constants/Events';

export function handlePerkClick(id) {
    return { type: types.HANDLE_PERK_EVENT, event: events.CLICK, id };
}

export function handlePerkRemove(id) {
    return { type: types.HANDLE_PERK_EVENT, event: events.REMOVE, id };
}

export function handlePerkEnter(id) {
    return { type: types.HANDLE_PERK_EVENT, event: events.MOUSE_ENTER, id };
}

export function handlePerkLeave(id) {
    return { type: types.HANDLE_PERK_EVENT, event: events.MOUSE_LEAVE, id };
}
