import * as statuses from '../constants/SkillStatuses';

export default class SkillsBuilder {
    constructor(store = {}) {
        this.store = store;
    }

    initialStore() {
        var store = this.store;
        store.trees = [];
        store.tiers = [];
        store.skills = [];
    }

    /**
     * 建立技能樹資料模型
     *
     * @param Object 資料模型
     */
    build(skillsModel) {
        this.initialStore();
        skillsModel = this.modelAttributeToCamelCase(skillsModel);

        var trees = skillsModel.skillTrees;
        var tierSettings = skillsModel.tierSetting;

        trees.forEach((tree) => this.buildTree(tree, tierSettings));
    }

    /**
     * 建立樹模型
     *
     * @param Object 資料模型
     * @param Object 階層設定值
     */
    buildTree(treeModel, tierSettings) {
        var tree = this.parseTreeModel(treeModel);
        var treeId = this.registerTree(tree);

        tree.tiers = treeModel['skills'].map((skills, tierIndex) =>
            this.buildTier(
                Object.assign({ treeId, skills }, tierSettings[tierIndex])
            ), this
        );
    }

    /**
     * 建立階層模型
     *
     * @param Object 資料模型
     */
    buildTier(tierModel) {
        var tier = this.parseTierModel(tierModel);
        var tierId = this.registerTier(tier);
        var treeId = tierModel.treeId;

        tier.skills = tierModel.skills.map((skill) =>
            this.buildSkill(
                Object.assign({ treeId , tierId }, skill)
            ), this
        );

        return tierId;
    }

    /**
     * 建立技能模型
     *
     * @param Object 資料模型
     */
    buildSkill(skillModel) {
        var skill = this.parseSkillModel(skillModel);

        return this.registerSkill(skill);
    }

    // =========================================================================
    // = Other.
    // =========================================================================

    modelAttributeToCamelCase(model) {
        if ( ! (model instanceof Object))
            return model;

        if (Array.isArray(model)) {
            return model.map((value) => this.modelAttributeToCamelCase(value), this);
        }

        var handled = {};
        Object.keys(model).forEach((key) => {
            var value = model[key];
            value = this.modelAttributeToCamelCase(value);

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

    // =========================================================================
    // = Register data.
    // =========================================================================

    registerTree(tree) {
        return this.store.trees.push(tree) - 1;
    }

    registerTier(tier) {
        return this.store.tiers.push(tier) - 1;
    }

    registerSkill(skill) {
        return this.store.skills.push(skill) - 1;
    }

    // =========================================================================
    // = Parse data.
    // =========================================================================

    parseTreeModel(model) {
        var name = model.name;
        return {
            name           : model.name,
            textTitle      : `${name}_title`,
            textSubtitle   : `${name}_subtitle`,
            textNotes      : `${name}_notes`,
            spendPoints    : 0,
            spendCosts     : 0,
            availablePoint : 120,
            reduced        : false
        }
    }

    parseTierModel(model) {
        return {
            treeId                   : model.treeId,
            tierUnlockRequire        : model.tierUnlockRequire,
            tierUnlockRequireReduced : model.tierUnlockRequireReduced,
            skillPointBasic          : model.skillPointBasic,
            skillPointAce            : model.skillPointAce,
            skillCostBasic           : model.skillCostBasic,
            skillCostAce             : model.skillCostAce,
            currectUnlockRequire     : 0,
            currectUnlockNeeded      : 0,
            unlocked                 : false
        }
    }

    parseSkillModel(model) {
        var name = model.name;
        return {
            treeId        : model.treeId,
            tierId        : model.tierId,
            name          : model.name,
            requiredSkill : model.required || null,
            textTitle     : `${name}_title`,
            textSubtitle  : `${name}_subtitle`,
            textBasic     : `${name}_basic`,
            textAce       : `${name}_ace`,
            textNotes     : `${name}_notes`,
            ownedBasic       : false,
            ownedAce         : false,
            unlockedBasic    : false,
            unlockedAce      : false,
            tierUnlocked     : false,
            requiredUnlocked : false,
            alerted       : false,
            status        : statuses.STATUS_LOCKED
        };
    }
}
