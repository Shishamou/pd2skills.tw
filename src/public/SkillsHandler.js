import * as statuses from '../constants/SkillStatuses';
import SkillsBuilder from './SkillsBuilder';
import Tree from '../models/Tree';
import Tier from '../models/Tier';
import Skill from '../models/Skill';

class SkillsHandler {
    constructor(store = {}) {
        this.store = store;
        this.skillSearchTemp = {};

        this.totalAvailablePoints = 120;
        this.store.availablePoints = 0;
        this.builder = new SkillsBuilder(store);
    }

    getTree(id) {
        return this.store.trees[id];
    }

    getTier(id) {
        return this.store.tiers[id];
    }

    getSkill(id) {
        return this.store.skills[id];
    }

    getSkillByName(search) {
        if (typeof this.skillSearchTemp[search] !== 'undefined')
            return this.getSkill(this.skillSearchTemp[search]);

        var skills = this.store.skills;
        for (let i = 0; i < skills.length; i++) {
            let skill = skills[i];
            if (skill.name === search) {
                this.skillSearchTemp[search] = i;
                return skill;
            }
        }

        throw `Cannot find skill named ${search}`;
    }

    // =========================================================================
    // =
    // =========================================================================

    initialSkillTrees(datas) {
        this.builder.build(datas);
        this.refreshSkillTrees();
    }

    // =========================================================================
    // = 刷新技能樹
    // =========================================================================

    refreshSkillTrees(treeId = null) {
        this.store.totalSpendPoints = 0;
        this.store.totalSpendCosts = 0;

        const countTreeSpend = (tree) => {
            this.store.totalSpendPoints += tree.spendPoints;
            this.store.totalSpendCosts += tree.spendCosts;
            this.store.availablePoints = this.totalAvailablePoints - this.store.totalSpendPoints;
        };

        if (treeId) {
            var target = this.getTree(treeId);
            this.store.trees.forEach((tree) => {
                if (tree === target) {
                    countTreeSpend(tree);
                }
            }, this);

            this.refreshTreeState(target);
            countTreeSpend(tree);
        } else {
            this.store.trees.forEach((tree) => {
                this.refreshTreeState(tree);
                countTreeSpend(tree);
            }, this);
        }
    }

    /**
     * 刷新技能樹
     */
    refreshTreeState(tree) {
        if ( ! (tree instanceof Tree))
            throw 'refreshTreeState: arg1 must be Tree Object';

        tree.spendPoints = 0;
        tree.spendCosts = 0;

        var tiers = tree.tiers;
        for (let i = 0; i < tiers.length; i++) {
            var tier = this.getTier(tiers[i]);
            this._refreshTreeStateHandleTier(tier, tree);
        }

        this.refreshSkillsStatus();
    }

    /**
     * 刷新技能樹處理階層
     */
    _refreshTreeStateHandleTier(tier, tree) {
        // 判斷是否有惡名減免
        tier.currectUnlockRequire = (tree.reduced)
            ? tier.tierUnlockRequireReduced
            : tier.tierUnlockRequire;

        // 計算解鎖需求與更新解鎖狀態
        tier.currectUnlockNeeded = tree.spendPoints - tier.currectUnlockRequire;
        tier.unlocked = (tier.currectUnlockNeeded >= 0);

        tier.skills.forEach((skillId) => {
            var skill = this.getSkill(skillId);
            this._refreshTreeStateHandleTierSkill(skill, tier, tree);
        }, this);
    }

    /**
     * 刷新技能樹處理階層技能
     */
    _refreshTreeStateHandleTierSkill(skill, tier, tree) {
        var needClearSkill = this._refreshTreeStateHandleTierSkillUpdate(skill, tier, tree);

        if (needClearSkill) {
            skill.unlockedBasic = false;
            skill.unlockedAce = false;
            skill.ownedBasic = false;
            skill.ownedAce = false;
            return;
        }

        if (skill.ownedBasic) {
            tree.spendPoints += tier.skillPointBasic;
            tree.spendCosts += tier.skillCostBasic;
        }

        if (skill.ownedAce) {
            tree.spendPoints += tier.skillPointAce;
            tree.spendCosts += tier.skillCostAce;
        }
    }

    /**
     * 刷新技能樹處理階層技能更新
     */
    _refreshTreeStateHandleTierSkillUpdate(skill, tier, tree) {
        // 檢查階層解鎖
        skill.tierUnlocked = tier.unlocked;
        if ( ! skill.tierUnlocked) return true;

        // 檢查前置技能解鎖
        if (skill.requiredSkill) {
            var requiredSkill = this.getSkillByName(skill.requiredSkill);
            if ( ! requiredSkill.ownedBasic) {
                skill.requiredUnlocked = false;
                return true;
            }
        }
        skill.requiredUnlocked = true;

        // 更新技能解鎖狀態
        var availablePoints = this.store.availablePoints - tree.spendPoints;
        skill.unlockedBasic = (skill.ownedBasic || (availablePoints >= tier.skillPointBasic));
        skill.unlockedAce = (tier.skillPointAce >= 0)
            ? (skill.ownedBasic)
                ? (skill.ownedAce || (availablePoints >= tier.skillPointAce))
                : (availablePoints >= tier.skillPointBasic + tier.skillPointAce)
            : false;
    }

    /**
     * 刷新所有技能狀態
     */
    refreshSkillsStatus() {
        this.store.skills.forEach((skill) => {
            skill.status = (function(skill) {
                if (skill.alerted)
                    return statuses.STATUS_ALERTED;
                if (skill.ownedAce)
                    return statuses.STATUS_ACED;
                if (skill.ownedBasic)
                    return statuses.STATUS_OWNED;
                if (skill.tierUnlocked)
                    return statuses.STATUS_UNLOCKED;
                return statuses.STATUS_LOCKED;
            })(skill);
        });
    }

    // =========================================================================
    // = handle skill
    // =========================================================================

    handleSkillClick(skillId) {
        var skill = this.getSkill(skillId);
        if ( ! skill.ownedBasic) {
            if (skill.unlockedBasic)
                skill.ownedBasic = true;
        } else if ( ! skill.ownedAce) {
            if (skill.unlockedAce)
                skill.ownedAce = true;
        }
        this.refreshSkillTrees(skill.treeId);
    }

    handleSkillRemove(skillId) {
        var skill = this.getSkill(skillId);
        skill.ownedBasic = false;
        skill.ownedAce = false;
        this.refreshSkillTrees(skill.treeId);
    }
}

export default new SkillsHandler;
