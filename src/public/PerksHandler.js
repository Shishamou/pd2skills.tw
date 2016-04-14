import PerksBuilder from './PerksBuilder';
import Perk from '../models/Perk';
import Deck from '../models/Deck';

export default class PerksHandler {
    constructor(store = {}) {
        this.store = store;
        this.builder = new PerksBuilder(store);

        this.store.spentPoints = 0;
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
        this.respec();
    }

    // =========================================================================
    // = Public methods
    // =========================================================================

    /**
     * 重置天賦
     */
    respec(target = null) {
        this.store.perks.forEach((perk) => {
            if (target === null || perk.id == target) {
                perk.equipped = false;
                perk.tier = 0;
            }
        }, this);

        this.refreshSpentPoints();
    }

    /**
     * 刷新花費點數
     */
    refreshSpentPoints() {
        this.store.spentPoints = this.countSpentPoints();
    }

    /**
     * 計算花費點數
     */
    countSpentPoints() {
        return this.store.perks.reduce((spentPoints, perk) => {
            if (perk.tier > 0) {
                return perk.decks.reduce((spentPoints, deckId, index) => {
                    if (index < perk.tier) {
                        return spentPoints + this.getDeck(deckId).required;
                    }

                    return spentPoints;
                }, spentPoints);
            }

            return spentPoints;
        }, 0);
    }

    // =========================================================================
    // = Refresh
    // =========================================================================

    equipPerk(target) {
        this.store.perks.forEach((perk) => {
            perk.equipped = (perk.id === target);
        }, this);
    }

    getEquippedPerk() {
        return this.store.perks.reduce((equipped, perk, index) => {
            if (perk.equipped)
                return index;
            return equipped;
        }, null);
    }

    setPerkTier(perkId, tier) {
        var perk = this.getPerk(perkId);
        perk.tier = Math.max(1, Math.min(tier, perk.decks.length));
    }

    // =========================================================================
    // = Handle event
    // =========================================================================

    handleDeckClick(deckId) {
        var deck = this.getDeck(deckId);
        var perk = this.getPerk(deck.perkId);

        perk.tier = perk.decks.indexOf(deckId) + 1;
        this.refreshSpentPoints();
    }
}
