import * as types from '../constants/SkillAppActions';

export default function handleDisplay(state = 0, action) {
  switch (action.type) {
    case types.SWITCH_MAIN_TAB:
      return action.name;
    default:
      return state;
  }
}
