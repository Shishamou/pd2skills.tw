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

        if (1) {
            tree.tiers = [];
            for (var tier = 0; tier <= 6; tier++) {
                var start = 3 * (tier - 1) + 1;
                var skills = (tier === 0)
                    ? treeModel['skills'].slice(0, 1)
                    : treeModel['skills'].slice(start, start + 3);

                tree.tiers.push(this.buildTier(
                    Object.assign({ treeId, skills, tier }, tierSettings[tier])
                ));
            }
        } else {
            tree.tiers = treeModel['skills'].map((skills, tierIndex) =>
                this.buildTier(
                    Object.assign({ treeId, skills, tier: tierIndex }, tierSettings[tierIndex])
                ), this
            );
        }
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
        return tree.id = this.store.trees.push(tree) - 1;
    }

    registerTier(tier) {
        return tier.id = this.store.tiers.push(tier) - 1;
    }

    registerSkill(skill) {
        return skill.id = this.store.skills.push(skill) - 1;
    }

    // =========================================================================
    // = Parse data.
    // =========================================================================

    parseTreeModel(model) {
        return {
            id             : null,
            name           : model.name,
            spendPoints    : 0,
            spendCosts     : 0,
            availablePoint : 120,
            reduced        : false
        }
    }

    parseTierModel(model) {
        return {
            id                       : null,
            tier                     : model.tier,
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
        return {
            id               : null,
            treeId           : model.treeId,
            tierId           : model.tierId,
            name             : model.name,
            requiredSkill    : model.required || null,
            ownedBasic       : false,
            ownedAce         : false,
            unlockedBasic    : false,
            unlockedAce      : false,
            tierUnlocked     : false,
            requiredUnlocked : false,
            alerted          : false,
            status           : statuses.STATUS_LOCKED
        };
    }
}
