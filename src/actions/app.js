import * as types from '../constants/SkillAppActions';

export function switchMainTab(name) {
    return { type: types.SWITCH_MAIN_TAB, name };
}
