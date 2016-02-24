import PerksBuilder from './PerksBuilder';
import Perk from '../models/Perk';
import Deck from '../models/Deck';

class PerksHandler {
    constructor(store = {}) {
        this.store = store;
        this.builder = new PerksBuilder(store);

        this.totalAvailablePoints = 37100;

        this.store.availablePoints = 0;
        this.store.spendPoints = 0;
    }

    getPerk(id) {
        return this.store.perks[id];
    }

    getDeck(id) {
        return this.store.decks[id];
    }

    // =========================================================================
    // = Initial
    // =========================================================================

    /**
     * 初始化惡名樹
     *
     * @param Object
     */
    initialPerks(datas) {
        this.builder.build(datas);
        console.log(this.store);
        this.respec();
    }

    // =========================================================================
    // = Public methods
    // =========================================================================

    /**
     * 重置天賦
     */
    respec() {
        this.store.perks.forEach((perk) => {
            perk.equipped = false;
            perk.tier = 0;
        }, this);

        this.refresh();
    }

    /**
     * 刷新天賦
     */
    refresh() {
    }

    // =========================================================================
    // = Refresh
    // =========================================================================

    _equipPerk(target) {
        this.store.perks.forEach((perk, perkId) => {
            perk.equipped = (perkId === target);
        }, this);
    }

    _setPerkTier(perkId, tier) {
        var perk = this.getPerk(perkId);
        perk.tier = Math.max(1, Math.min(tier, perk.decks.length));
    }

    // =========================================================================
    // = Handle event
    // =========================================================================

    handleDeckClick(deckId) {
        var deck = this.getDeck(deckId);
        var perk = this.getPerk(deck.perkId);
        perk.tier = perk.decks.reduce(function (previous, currect, currectIndex) {
            return (currect.id === deckId)? currectIndex + 1 : previous;
        }, 0);
    }

    handlePerkClick(perkId) {
        this._equipPerk(perkId);
    }
}

export default new PerksHandler;
