import * as statuses from '../constants/InfamyStatuses';
import InfamyTreeBuilder from './InfamyTreeBuilder';
import Infamy from '../models/Infamy';

export default class InfamyTreeHandler {
    constructor(store = {}) {
        this.store = store;
        this.builder = new InfamyTreeBuilder(store);

        this.tableCenter = [0, 0];
        this.totalAvailablePoints = 5;

        this.store.availablePoints = 0;
        this.store.spendPoints = 0;

        this.store.reduced = [];
    }

    /**
     * 取得惡名模型
     *
     * @param integer
     * @return object
     */
    getInfamy(id) {
        return this.store.infamyList[id];
    }

    /**
     * 取得指定座標之惡名模型
     *
     * @param integer 行
     * @param integer 列
     * @return object
     */
    getPos(row, col) {
        return this.getInfamy(this.store.infamyTable[row][col]);
    }

    // =========================================================================
    // = Initial
    // =========================================================================

    /**
     * 初始化惡名樹。
     * 呼叫 builder 建立惡名樹表格。計算表格中心後，刷新惡名樹表格。
     *
     * @param Object
     */
    initialInfamyTrees(datas) {
        this.builder.build(datas);
        this.initalTableCenter();
        this.refreshInfamyTree();
    }

    /**
     * 初始化表格中心點。
     * 用來計算惡名樹。
     */
    initalTableCenter() {
        var table = this.store.infamyTable;
        var rows = table.length;
        var cols = table[0].length;
        this.tableCenter = [ Math.floor(cols / 2), Math.floor(rows / 2) ];
    }

    // =========================================================================
    // = 功能
    // =========================================================================

    /**
     * 重置惡名樹。
     * 清除所有惡名的 owned 狀態，然後刷新表格。
     */
    respecSkillTrees() {
        this.store.infamyList.forEach((infamy) => {
            infamy.owned = false;
        }, this);

        this.refreshInfamyTree();
    }

    /**
     * 刷新惡名樹。刷新減免效果(reduce)。並計算花費與可用點數。
     */
    refreshInfamyTree() {
        var spendPoints = this._updateTable();
        this._refreshReduce();
        this.store.availablePoints = this.totalAvailablePoints;

        this.store.availablePoints = this.totalAvailablePoints - spendPoints;
        this.store.spendPoints = spendPoints;
    }

    /**
     * 刷新所有惡名狀態。
     * 僅刷新 infamy.status 不進行惡名樹的更新。
     */
    refreshAllStatus() {
        this.store.infamyList.forEach((infamy) => {
            this._updateInfamyStatue(infamy);
        }, this);
    }

    // =========================================================================
    // = 刷新惡名樹
    // =========================================================================

    /**
     * 更新惡名表格。
     * 重複更新(最多十次)直到表格穩定，回傳使用的點數。
     *
     * @return integer
     */
    _updateTable() {
        var temp = 0;
        for (var t = 10; t > 0; t--) {
            var spendPoints = this._updateTableAndCountSpendPoints();
            if (temp == spendPoints) return spendPoints;
            temp = spendPoints;
        }
    }

    /**
     * 更新惡名表格並回傳使用的點數。
     * 從座標 0,0 到 5,5 逐一呼叫 _updateTableInfamy。
     *
     * @return integer
     */
    _updateTableAndCountSpendPoints() {
        var count = 0;
        var table = this.store.infamyTable;
        for (let row = 0; row < table.length; row++)
            for (let col = 0; col < table[row].length; col++)
                this._updateTableInfamy(row, col) && count++;
        return count;
    }

    /**
     * 更新指定座標之惡名模型，並回傳 owned 狀態。
     * 取得靠近表格中心的兩側相鄰惡名模型之擁有狀態，以計算解鎖狀態。
     *
     * @param integer 行
     * @param integer 列
     * @return boolean
     */
    _updateTableInfamy(row, col) {
        var infamy = this.getPos(row, col);
        var [ centerX, centerY ] = this.tableCenter;

        var checkX = () => (col === centerX)
            ? true
            : (this.getPos(row, col + ((col < centerX)? 1 : -1)).owned);

        var checkY = () => (row === centerY)
            ? true
            : (this.getPos(row + ((row < centerY)? 1 : -1), col).owned);

        if ( ! (infamy.unlocked = (checkX() && checkY())))
            infamy.owned = false;

        this._updateInfamyStatue(infamy);
        return infamy.owned;
    }

    /**
     * 更新 infamy.status。
     *
     * @param infamy
     */
    _updateInfamyStatue(infamy) {
        infamy.status = ((infamy) => {
            if (infamy.disable)
                return statuses.STATUS_DISABLE;
            if (infamy.owned)
                return statuses.STATUS_OWNED;
            if (infamy.unlocked)
                return statuses.STATUS_UNLOCKED;
            return statuses.STATUS_LOCKED;
        })(infamy);
    }

    /**
     * 刷新減免效果(reduce)。
     */
    _refreshReduce() {
        var reduced = [];
        this.store.infamyList.forEach((infamy) => {
            if (infamy.owned && infamy.reduce.length > 0) {
                reduced = reduced.concat(infamy.reduce);
            }
        });

        this.store.reduced = reduced.filter((v, k, arr) => arr.indexOf(v) === k);
    }

    // =========================================================================
    // = handle skill
    // =========================================================================

    handleInfamyClick(infamyId) {
        var infamy = this.getInfamy(infamyId);
        if (infamy.disable) return;

        if ( ! infamy.owned)
            if (infamy.unlocked)
                infamy.owned = true;
        this.refreshInfamyTree();
    }

    handleInfamyRemove(infamyId) {
        var infamy = this.getInfamy(infamyId);
        infamy.owned = false;

        this.refreshInfamyTree();
    }
}
