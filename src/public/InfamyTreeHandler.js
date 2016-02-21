import * as statuses from '../constants/InfamyStatuses';
import InfamyTreeBuilder from './InfamyTreeBuilder';
import Infamy from '../models/Infamy';

class InfamyTreeHandler {
    constructor(store = {}) {
        this.store = store;
        this.builder = new InfamyTreeBuilder(store);

        this.totalAvailablePoints = 5;
        this.tableCenter = [0, 0];

        this.store.availablePoints = 0;
        this.store.spendPoints = 0;
    }

    getInfamy(id) {
        return this.store.infamyList[id];
    }

    getPos(row, col) {
        return this.getInfamy(this.store.infamyTable[row][col]);
    }

    // =========================================================================
    // = Initial
    // =========================================================================

    /**
     * 初始化惡名樹
     *
     * @param Object
     */
    initialInfamyTrees(datas) {
        this.builder.build(datas);
        this.initalTableCenter();
        this.refreshInfamyTree();
    }

    /**
     * 初始化惡名樹中心點
     */
    initalTableCenter() {
        var table = this.store.infamyTable;
        var rows = table.length;
        var cols = table[0].length;
        this.tableCenter = [ Math.floor(cols / 2), Math.floor(rows / 2) ];
    }

    // =========================================================================
    // =
    // =========================================================================

    /**
     * 重置惡名樹
     */
    respecSkillTrees() {
        this.store.infamyList.forEach((infamy) => {
            infamy.owned = false;
        }, this);

        this.refreshInfamyTree();
    }

    /**
     * 刷新惡名樹
     */
    refreshInfamyTree() {
        this._updateTable();
        this.store.availablePoints = this.totalAvailablePoints;
    }

    /**
     * 刷新所有惡名狀態，僅刷新 infamy.status 不進行惡名樹的更新
     */
    refreshAllStatus() {
        this.store.infamyList.forEach((infamy) => {
            this._updateInfamyStatue(infamy);
        }, this);
    }

    // =========================================================================
    // = 刷新惡名樹
    // =========================================================================

    _updateTable() {
        var table = this.store.infamyTable;

        for (let row = 0; row < table.length; row++)
            for (let col = 0; col < table[row].length; col++)
                this._updateTableInfamy(row, col);
    }

    _updateTableInfamy(row, col) {
        var infamy = this.getPos(row, col);
        var [ centerX, centerY ] = this.tableCenter;

        var checkX = (col === centerX)
            ? true
            : (this.getPos(row, col + ((col < centerX)? 1 : -1)).owned);

        var checkY = (row === centerY)
            ? true
            : (this.getPos(row + ((row < centerY)? 1 : -1), col).owned);

        infamy.unlocked = (checkX && checkY && ! infamy.disable);
        if ( ! infamy.unlocked)
            infamy.owned = false;

        this._updateInfamyStatue(infamy);
    }

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

    // =========================================================================
    // = handle skill
    // =========================================================================

    handleInfamyClick(infamyId) {
        var infamy = this.getInfamy(infamyId);

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

export default new InfamyTreeHandler;
