import Infamy from '../models/Infamy';

export default class InfamyTreeBuilder {
    constructor(store = {}) {
        this.store = store;
        this.initialStore();
    }

    initialStore() {
        var store = this.store;
        store.infamyTable = [];
        store.infamyList = [];
    }

    /**
     * 建立惡名樹
     *
     * @param Object
     */
    build(datas) {
        this.initialStore();
        datas = this.objectAttributeToCamelCase(datas);

        var infamyDatas = datas.infamyTree;
        var infamyTable = this.store.infamyTable = [];

        for (var row = 0; row < 5; row++)
            infamyTable[row] = infamyDatas.splice(0, 5).map((infamy)=>this.buildInfamy(infamy));
    }

    /**
     * 建立惡名
     *
     * @param Object 資料模型
     * @param integer id
     */
    buildInfamy(datas) {
        var infamy = this.createInfamy(datas);
        return infamy.id = this.registerInfamy(infamy);
    }

    /**
     * 建立惡名資料模型
     *
     * @param Object 資料模型
     * @param Infamy 惡名資料模型
     */
    createInfamy(props) {
        return new Infamy(props);
    }

    /**
     * 註冊惡名資料模型
     *
     * @param Infamy 惡名資料模型
     * @param integer id
     */
    registerInfamy(infamy) {
        return infamy.id = this.store.infamyList.push(infamy) - 1;
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
