import Model from './Model';

export default class Tree extends Model {
    getInitial() {
        return {
            id             : null,
            name           : null,
            tiers          : [],
            spendPoints    : 0,
            spendCosts     : 0,
            availablePoint : 120,
            reduced        : false
        }
    }
}
