import Model from './Model';

export default class Deck extends Model {
    getInitial() {
        return {
            id       : null,
            perkId   : null,
            name     : null,
            icon     : null,
            required : 0,
            datas    : {}
        }
    }
}
