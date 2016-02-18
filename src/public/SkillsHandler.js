import * as statuses from '../constants/SkillStatuses';
import SkillsBuilder from './SkillsBuilder';
import Tree from '../models/Tree';
import Tier from '../models/Tier';
import Skill from '../models/Skill';

class SkillsHandler {
    constructor(store = {}) {
        this.store = store;
        this.skillSearchTemp = {};
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
        this.store.trees.forEach((tree) => {
            this.updateTreeState(tree.id);
        });
    }

    /**
     * 更新技能樹
     */
    updateTreeState(treeId) {
        var tree = this.getTree(treeId);

        tree.spendPoints = 0;
        tree.spendCosts = 0;

        var tiers = tree.tiers;
        for (let i = 0; i < tiers.length; i++) {
            var tier = this.getTier(tiers[i]);

            // 判斷是否有惡名減免
            tier.currectUnlockRequire = (tree.reduced)
                ? tier.tierUnlockRequireReduced
                : tier.tierUnlockRequire;

            // 計算解鎖需求與更新解鎖狀態
            tier.currectUnlockNeeded = tree.spendPoints - tier.currectUnlockRequire;
            tier.unlocked = (tier.currectUnlockNeeded >= 0);

            tier.skills.forEach((skillId) => {
                var skill = this.getSkill(skillId);

                var needClearSkill = (function (skill, tier, tree) {
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
                    var availablePoint = tree.availablePoint - tree.spendPoints;
                    skill.unlockedBasic = (skill.ownedBasic || (availablePoint >= tier.skillPointBasic));
                    skill.unlockedAce = (tier.skillPointAce >= 0)
                        ? (skill.ownedBasic)
                            ? (skill.ownedAce || (availablePoint >= tier.skillPointAce))
                            : (availablePoint >= tier.skillPointBasic + tier.skillPointAce)
                        : false;
                }.bind(this))(skill, tier, tree);

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
            }, this);
        }

        this.refreshSkillsStatus();
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
        this.updateTreeState(skill.treeId);
    }

    handleSkillRemove(skillId) {
        var skill = this.getSkill(skillId);
        skill.ownedBasic = false;
        skill.ownedAce = false;
        this.updateTreeState(skill.treeId);
    }
}

export default new SkillsHandler;
