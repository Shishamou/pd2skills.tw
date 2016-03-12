import PerksHandler from '../facades/PerksHandler';
import * as types from '../constants/SkillAppActions';
import * as events from '../constants/Events';

const initialState = Object.assign({
    activedPerk: null,
    display: null,
}, PerksHandler.store);

export default function handlePerk(state = initialState, action) {
    switch (action.type) {
        case types.LOAD_PERKS:
            return loadPerks(state, action);
        case types.HANDLE_PERK_EVENT:
            return handlePerkEvent(state, action);
        case types.HANDLE_DECK_EVENT:
            return handleDeckEvent(state, action);
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

function handlePerkEvent(state = {}, action) {
    var perk = action.id;

    switch (action.event) {
        case events.CLICK:
            return Object.assign({}, state, {
                activedPerk: perk
            });
        case events.DOUBLE_CLICK:
            PerksHandler.equipPerk(perk);
            break;
        
        case events.REMOVE:
            PerksHandler.respec(perk);
            break;

        default:
            return state;
    }

    return Object.assign({}, state, PerksHandler.store, {
        perks: PerksHandler.store.perks.slice(),
    });
}

function handleDeckEvent(state = {}, action) {
    var deckId = action.id;

    switch (action.event) {
        case events.CLICK:
            PerksHandler.handleDeckClick(deckId);
            return Object.assign({}, state, PerksHandler.store, {
                perks: PerksHandler.store.perks.slice(),
                decks: PerksHandler.store.decks.slice(),
                display: state.display
            });

        case events.MOUSE_ENTER:
            var hover = true;
        case events.MOUSE_LEAVE:
            if (hover) {
                state.display = deckId;
            }

            return Object.assign({}, state, {
                display: state.display
            });

        default:
            return state;
    }
}
