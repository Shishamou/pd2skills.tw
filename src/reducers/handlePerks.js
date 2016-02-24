import PerksHandler from '../public/PerksHandler';
import * as types from '../constants/SkillAppActions';
import * as events from '../constants/Events';

const initialState = Object.assign({
    display: null,
}, PerksHandler.store);

export default function handleInfamyTree(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_PERKS:
            return loadPerks(state, action);
        case types.HANDLE_PERK_EVENT:
            return handleInfamyEvent(state, action);
        default:
            return state;
    }
}

function loadPerks(state = {}, action) {
    switch (action.status) {
        case 'success':
            PerksHandler.initialPerks(action.response);
            return Object.assign({}, state, PerksHandler.store);

        case 'error':
            throw '讀取檔案失敗: ' + action.error;
            return state;

        default:
            return initialState;
    }
}

function handleInfamyEvent(state = {}, action) {
    var infamy = PerksHandler.getInfamy(action.id);

    switch (action.event) {
        case events.CLICK:
            PerksHandler.handleInfamyClick(infamy.id);
            break;

        case events.REMOVE:
            PerksHandler.handleInfamyRemove(infamy.id);
            break;

        case events.MOUSE_ENTER:
            var hover = true;
        case events.MOUSE_LEAVE:
            if (hover) {
                state.display = infamy.id;
            }

            PerksHandler.refreshAllStatus();
            return Object.assign({}, state, {
                display: state.display
            });

        default:
            return state;
    }

    action.skillReduce = PerksHandler.store.reduced;
    return Object.assign({}, state, PerksHandler.store, {
        infamyList: PerksHandler.store.infamyList.slice(),
        display: state.display
    });
}
