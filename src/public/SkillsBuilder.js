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
    build(datas) {
        this.initialStore();

        var { subtrees, skills, tiersInformation } = datas;
        tiersInformation = this.objectAttributeToCamelCase(tiersInformation);

        this.skills = datas.skills;
        this.tierSettings = tiersInformation;
        subtrees.forEach((tree) => this.buildSubTree(tree));
    }

    /**
     * 建立樹模型
     *
     * @param Object 資料模型
     * @param Object 階層設定值
     */
    buildTree(treeData, tierSettings) {
        var tree = this.createTree({ name: treeData.name });
        var treeId = this.registerTree(tree);

        tree.tiers = [];
        for (var tier = 0; tier <= 6; tier++) {
            var start = 3 * (tier - 1) + 1;
            var skills = (tier === 0)
                ? treeData['skills'].slice(0, 1)
                : treeData['skills'].slice(start, start + 3);

            tree.tiers.push(this.buildTier(
                Object.assign({ treeId, skills, tier }, tierSettings[tier])
            ));
        }
    }

    /**
     * 建立樹模型
     *
     * @param Object 資料模型
     * @param Object 階層設定值
     */
    buildSubTree(treeData) {
        var tree = this.createTree({ name: treeData.name });
        var treeId = this.registerTree(tree);
        var tierSettings = this.tierSettings;

        tree.tiers = [];
        for (var tier = 0; tier < 4; tier++) {
            var start = 2 * (tier - 1) + 1;
            var skills = (tier === 0 || tier === 4)
                ? treeData['skills'].slice(0, 1)
                : treeData['skills'].slice(start, start + 2);

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
    buildTier(tierData) {
        var tier = this.createTier(tierData);
        var tierId = this.registerTier(tier);
        var treeId = tierData.treeId;

        tier.skills = tierData.skills.map((skill) => {
            return this.buildSkill({
                treeId,
                tierId,
                name: skill.name,
                requiredSkill: skill.required,
                datas: skill.datas
            });
        });

        return tierId;
    }

    /**
     * 建立技能模型
     *
     * @param Object 資料模型
     */
    buildSkill(skillData) {
        var skill = this.createSkill(skillData);
        return this.registerSkill(skill);
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

    // =========================================================================
    // = Register model.
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
    // = Create model.
    // =========================================================================

    createTree(props) {
        return new Tree(props);
    }

    createTier(props) {
        return new Tier(props);
    }

    createSkill(props) {
        return new Skill(props);
    }
}
