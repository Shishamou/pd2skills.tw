import Model from './Model';

export default class Perk extends Model {
    getInitial() {
        return {
            id       : null,
            name     : null,
            equipped : false,
            rank     : 0,
            decks    : []
        }
    }
}
