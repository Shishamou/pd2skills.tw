import HashStorage from './facades/HashStorage';
import * as types from './constants/SkillAppActions';
import * as events from './constants/Events';

const middleware = store => next => action => {
    const result = next(action);

    const state = store.getState();
    const inArray = (search, array) => (array.indexOf(search) >= 0);
    const save = () => { HashStorage.save((hash) => location.hash = `/${hash}`) };

    switch (action.type) {
        case types.HANDLE_SKILL_EVENT:
            if (inArray(action.event, [ events.MOUSE_ENTER, events.MOUSE_LEAVE ])) {
                return result;
            }
        case types.RESPEC_SKILL_TREE:
            HashStorage.saveSkills(state.skills);
            save();
            break;

        case types.HANDLE_PERK_EVENT:
        case types.HANDLE_DECK_EVENT:
            HashStorage.savePerks(state.perks);
            save();
            break;

        case types.HANDLE_INFAMY_EVENT:

    }

    return result;
}

export default middleware;
