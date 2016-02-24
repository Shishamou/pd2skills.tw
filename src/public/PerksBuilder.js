import Perk from '../models/Perk';
import Deck from '../models/Deck';

export default class PerksBuilder {
    constructor(store = {}) {
        this.store = store;
        this.initialStore();
    }

    initialStore() {
        var store = this.store;
        store.perks = [];
        store.decks = [];
    }

    // =========================================================================
    // = Build
    // =========================================================================

    /**
     * 建立天賦牌組
     *
     * @param Object
     */
    build(datas) {
        this.initialStore();
        datas = this.objectAttributeToCamelCase(datas);

        var perks = datas.perks;
        this.rankRequired = datas.ranks;

        perks.forEach((perk) => {this.buildPerk(perk)}, this);
    }

    /**
     * 建立天賦
     *
     * @param Object 資料模型
     * @return integer id
     */
    buildPerk(datas) {
        const perk = this.createPerk(datas);
        this.registerPerk(perk);

        const { rankRequired } = this;
        perk.decks = datas.decks.map((deck, rank) => this.buildDeck(
            Object.assign(deck, {
                perkId: perk.id,
                required: rankRequired[rank]
            }
        )), txhis);
    }

    /**
     * 建立牌組
     *
     * @param Object 資料模型
     * @return integer id
     */
    buildDeck(datas) {
        var deck = this.createDeck(datas);
        return this.registerDeck(deck);
    }

    // =========================================================================
    // = Create instance
    // =========================================================================

    /**
     * 建立天賦
     *
     * @param Object 要傳入的資料
     * @return Perk
     */
    createPerk(props) {
        return new Perk(props);
    }

    /**
     * 建立牌組
     *
     * @param Object 要傳入的資料
     * @return Deck
     */
    createDeck(props) {
        return new Deck(props);
    }

    /**
     * 註冊天賦
     *
     * @param Perk
     * @return integer id
     */
    registerPerk(perk) {
        if (perk instanceof Perk) {
            return perk.id = this.store.perks.push(perk) - 1;
        }
    }

    /**
     * 註冊牌組
     *
     * @param Deck
     * @return integer id
     */
    registerDeck(deck) {
        if (deck instanceof Deck) {
            return deck.id = this.store.decks.push(deck) - 1;
        }
    }

    // =========================================================================
    // = Other.
    // =========================================================================

    objectAttributeToCamelCase(object) {
        if ( ! (object instanceof Object))
            return object;

        if (Array.isArray(object)) {
            return object.map((value) => this.objectAttributeToCamelCase(value), this);
        }

        var handled = {};
        Object.keys(object).forEach((key) => {
            var value = object[key];
            value = this.objectAttributeToCamelCase(value);

            key = this.toCamelCase(key);
            handled[key] = value;
        }, this);

        return handled;
    }

    toCamelCase(string) {
        return string.replace(
    	    /((?!_)\w)_\w/g,
    	    (match) => match.charAt(0) + match.substr(-1).toUpperCase()
        )
    }
}
