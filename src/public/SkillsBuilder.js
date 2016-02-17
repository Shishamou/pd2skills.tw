import * as statuses from '../constants/SkillStatuses';
import Tree from '../models/Tree';
import Tier from '../models/Tier';
import Skill from '../models/Skill';

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
        var tree = this.parseTreeModel({ name: treeModel.name });
        var treeId = this.registerTree(tree);

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
            this.buildSkill({ treeId, tierId, name: skill.name, requiredSkill: skill.required }
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
        return new Tree(model);
    }

    parseTierModel(model) {
        return new Tier(model);
    }

    parseSkillModel(model) {
        return new Skill(model);
    }
}
