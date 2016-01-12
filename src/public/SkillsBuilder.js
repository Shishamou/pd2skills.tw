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

    build(skillsModel) {
        var trees = skillsModel['skill_trees'];
        var tierSettings = skillsModel['tier_setting'];

        this.initialStore();
        trees.forEach((tree) => this.buildTree(tree, tierSettings));
    }

    buildTree(treeModel, tierSettings) {
        console.log(['treeModel', treeModel]);
        var tree = this.parseTreeModel(treeModel);
        var treeId = this.registerTree(tree);
        var tierSetting
        tree.tiers = treeModel['skills'].map((skills, tierIndex) => this.buildTier(
            Object.assign({
                tree_id: treeId,
                skills,
            }, tierSettings[tierIndex])
        ), this);
    }

    buildTier(tierModel) {
        var tier = this.parseTierModel(tierModel);
        var tierId = this.registerTier(tier);

        tier.skills = tierModel.skills.map((skill) => this.buildSkill(
            Object.assign({
                tree_id: tierModel.tree_id,
                tier_id: tierId,
            }, skill)
        ), this);

        return tierId;
    }

    buildSkill(skillModel) {
        var skill = this.parseSkillModel(skillModel);
        return this.registerSkill(skill);
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
            name          : model.name,
            text_title    : `${name}_title`,
            text_subtitle : `${name}_subtitle`,
            text_notes    : `${name}_notes`,
            spend_points  : 0,
            spend_costs   : 0,
            reduced       : false
        }
    }

    parseTierModel(model) {
        return {
            tree_id                     : model.tree_id || -1,
            tier_unlock_require         : model.tier_unlock_require,
            tier_unlock_require_reduced : model.tier_unlock_require_reduced,
            skill_point_basic           : model.skill_point_basic,
            skill_point_ace             : model.skill_point_ace,
            skill_cost_basic            : model.skill_cost_basic,
            skill_cost_ace              : model.skill_cost_ace,
            currect_unlock_require      : 0,
            currect_unlock_needed       : 0,
            unlock_status               : 0
        }
    }

    parseSkillModel(model) {
        var name = model.name;
        return {
            tree_id        : model.tree_id,
            tier_id        : model.tier_id,
            name           : model.name,
            required_skill : model.required || null,
            text_title     : `${name}_title`,
            text_subtitle  : `${name}_subtitle`,
            text_basic     : `${name}_basic`,
            text_ace       : `${name}_ace`,
            text_notes     : `${name}_notes`,
            owned_basic    : false,
            owned_ace      : false,
            unlocked_basic : false,
            unlocked_ace   : false,
            alerted        : false,
            status         : statuses.STATUS_LOCKED
        };
    }
}
