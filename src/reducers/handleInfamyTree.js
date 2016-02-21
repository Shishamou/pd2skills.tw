import InfamyTreeHandler from '../public/InfamyTreeHandler';
import * as types from '../constants/SkillAppActions';
import * as events from '../constants/Events';

const initialState = Object.assign({
    display: null,
}, InfamyTreeHandler.store);

export default function handleInfamyTree(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_INFAMYTREE:
            return loadInfamyTree(state, action);
        case types.HANDLE_INFAMY_EVENT:
            return handleInfamyEvent(state, action);
        default:
            return state;
    }
}

function loadInfamyTree(state = {}, action) {
    switch (action.status) {
        case 'success':
            InfamyTreeHandler.initialInfamyTrees(action.response);
            return Object.assign({}, state, InfamyTreeHandler.store);

        case 'error':
            throw '讀取檔案失敗: ' + action.error;
            return state;

        default:
            return initialState;
    }
}

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
            var hover = true;
        case events.MOUSE_LEAVE:
            if (hover) {
                state.display = infamy.id;
            }

            InfamyTreeHandler.refreshAllStatus();
            break;

        default:
            return state;
    }

    return Object.assign({}, state, SkillsHandler.store, {
        infamyList: SkillsHandler.store.infamyList.slice(),
        display: state.display
    });
}
