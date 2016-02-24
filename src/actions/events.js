import * as types from '../constants/SkillAppActions';
import * as events from '../constants/Events';

export function handlePerkClick(id) {
    return { type: types.HANDLE_PERK_EVENT, event: events.CLICK, id };
}

export function handlePerkDouble(id) {
    return { type: types.HANDLE_PERK_EVENT, event: events.DOUBLE_CLICK, id };
}

export function handleDeckClick(id) {
    return { type: types.HANDLE_DECK_EVENT, event: events.CLICK, id };
}

export function handleDeckEnter(id) {
    return { type: types.HANDLE_DECK_EVENT, event: events.MOUSE_ENTER, id };
}

export function handleDeckLeave(id) {
    return { type: types.HANDLE_DECK_EVENT, event: events.MOUSE_LEAVE, id };
}
