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

        var { infamy, tree } = datas;
        var infamyList = infamy, infamyIndex = {};
        infamyList.forEach((infamy, index) => {
            infamyIndex[infamy.name] = index;
        })

        var infamyTable = this.store.infamyTable = [];
        for (var row = 0; row < 5; row++)
            infamyTable[row] = tree.splice(0, 5).map((infamy) => {
                infamy = infamyList[infamyIndex[infamy]];
                return this.buildInfamy(infamy);
            });
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
}
