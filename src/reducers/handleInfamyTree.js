import InfamyTreeHandler from '../facades/InfamyTreeHandler';
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
        case types.REFRESH_INFAMYTREE:
            InfamyTreeHandler.refreshInfamyTree();
            action.skillReduce = InfamyTreeHandler.store.reduced;
            return Object.assign({}, state, InfamyTreeHandler.store);
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
            return Object.assign({}, state, {
                display: infamy.id
            });

        case events.MOUSE_LEAVE:
        default:
            return state;
    }

    action.skillReduce = InfamyTreeHandler.store.reduced;
    return Object.assign({}, state, InfamyTreeHandler.store, {
        display: state.display
    });
}
