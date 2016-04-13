import * as statuses from '../constants/SkillStatuses';
import SkillsBuilder from './SkillsBuilder';
import Tree from '../models/Tree';
import Tier from '../models/Tier';
import Skill from '../models/Skill';

export default class SkillsHandler {
    constructor(store = {}) {
        this.store = store;
        this.builder = new SkillsBuilder(store);
        this.skillSearchTemp = {};

        this.totalAvailablePoints = 100;
        this.store.availablePoints = 0;

        this.store.costReduced = false;
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

    /**
     * 初始化技能樹
     *
     * @param object 技能樹資料
     */
    initialSkillTrees(datas) {
        this.builder.build(datas);
        this.refreshSkillTrees();
    }

    /**
     * 重置技能樹
     *
     * @param integer 要更新的技能樹 id，若省略則更新所有技能樹階層
     */
    respecSkillTrees(targetId = null) {
        this.store.skills.forEach((skill) => {
            if (targetId === null || skill.treeId == targetId) {
                skill.ownedBasic = false;
                skill.ownedAce = false;
            }
        }, this);

        this.refreshSkillTrees(targetId);
    }

    setupSkillReduce(reduced) {
        if (reduced instanceof Array) {
            this.totalAvailablePoints = 100;

            this.store.trees.forEach((tree) => {
                var bool = (reduced.indexOf(tree.name) >= 0);
                if (tree.reduced !== bool) {
                    tree.reduced = bool;
                    this.refreshSkillTrees(tree.id);
                }

                if (bool) {
                    this.totalAvailablePoints += 1;
                }
            }, this);

            this.store.costReduced = (reduced.indexOf('cost') >= 0);
        }
    }

    /**
     * 刷新惡名加成
     *
     * @param array
     */
    refreshInfamyBonus(reduced) {
        if ( ! (reduced instanceof Array)) return;

        var bonusPoints = 0;

        reduced.forEach((bonus) => {
            console.log(bonus);
            if (bonus === 'cost') {
                return this.store.costReduced = true;
            }

            bonusPoints += 1;
        });

        this.totalAvailablePoints = 100 + Math.min(4, bonusPoints);
    }

    /**
     * 刷新技能樹
     *
     * @param integer 要更新的技能樹 id，若省略則更新所有技能樹階層
     */
    refreshSkillTrees(targetId = null) {
        var temp = 0;
        for (var t = 10; t > 0; t--) {
            var totalSpendPoints = this._updateTreeTiersAndCountSpendPoints(targetId);
            this.store.totalSpendPoints = totalSpendPoints;
            this.store.availablePoints = this.totalAvailablePoints - totalSpendPoints;
            this._updateTreeSkills(targetId);

            if (temp === totalSpendPoints) break;
            temp = totalSpendPoints;
        }
    }

    /**
     * 刷新所有技能狀態，僅刷新 skill.status 不進行技能的更新
     */
    refreshAllSkillsStatus() {
        this.store.skills.forEach((skill) => {
            this._refreshSkillStatus(skill);
        }, this);
    }

    // =========================================================================
    // = 刷新技能樹
    // =========================================================================

    /**
     * 更新技能樹階層解鎖與計算花費點數
     *
     * @param integer 要更新的技能樹 id，若省略則更新所有技能樹階層
     */
    _updateTreeTiersAndCountSpendPoints(targetId = null) {
        var spendPoints = this.store.trees.map((tree) =>
            (targetId === null || tree.id == targetId)
                ? this._updateTreeTiers(tree)
                : tree.spendPoints
        );

        return spendPoints.reduce((prev, curr) => prev + curr);
    }

    /**
     * 更新技能樹階層
     *
     * @param Tree 要被處理的技能樹
     * @return integer 技能樹花費的點數
     */
    _updateTreeTiers(tree) {
        var spendPoints = 0;

        tree.tiers.forEach((tier) => {
            tier = this.getTier(tier);

            tier.currectUnlockRequire = (tree.reduced)
                ? tier.tierUnlockRequireReduced
                : tier.tierUnlockRequire;

            tier.currectUnlockNeeded = spendPoints - tier.currectUnlockRequire;
            tier.unlocked = (tier.currectUnlockNeeded >= 0);

            if (tier.unlocked)
                spendPoints += this._countTierSpendPoints(tier);
        }, this);

        return tree.spendPoints = spendPoints;
    }

    /**
     * 計算階層花費的點數
     *
     * @param Tier 要被處理的階層
     * @return integer 階層花費的點數
     */
    _countTierSpendPoints(tier) {
        var spendPoints = 0;
        tier.skills.forEach((skill) => {
            skill = this.getSkill(skill);
            if (skill.ownedAce)
                spendPoints += tier.skillPointBasic + tier.skillPointAce;
            else if (skill.ownedBasic)
                spendPoints += tier.skillPointBasic;
        }, this);
        return spendPoints;
    }

    /**
     * 更新技能樹技能
     *
     * @param integer 要更新的技能樹 id，若省略則更新所有技能樹階層
     */
    _updateTreeSkills(targetId = null) {
        this.store.trees.forEach((tree) => {
            (targetId === null || tree.id == targetId) && this._doUpdateTreeSkills(tree);
        }, this);
    }

    /**
     * 更新技能樹技能
     *
     * @param Tree 要被處理的技能樹
     */
    _doUpdateTreeSkills(tree) {
        tree.tiers.forEach((tier) => {
            tier = this.getTier(tier);
            tier.skills.forEach((skill) => {
                skill = this.getSkill(skill);
                this._updateSkill(skill, tier, tree);
            }, this);
        }, this);
    }

    /**
     * 更新技能
     *
     * @param Skill 要被處理的技能
     * @param Tier|null 傳入技能階層
     * @param Tree|null 傳入技能樹
     */
    _updateSkill(skill, tier, tree) {
        if ( ! (skill instanceof Skill))
            throw 'arg1 must be Skill object';
        tier = (tier instanceof Tier)? tier : this.getTier(skill.tierId);
        tree = (tree instanceof Tree)? tree : this.getTree(skill.treeId);

        if (this._doUpdateSkill(skill, tier, tree)) {
            skill.unlockedBasic = false;
            skill.unlockedAce = false;
            skill.ownedBasic = false;
            skill.ownedAce = false;
        }

        this._refreshSkillStatus(skill);
    }

    /**
     * 更新技能
     *
     * @param Skill 要被處理的技能
     * @param Tier 傳入技能階層
     * @param Tree 傳入技能樹
     * @return boolean 是否清除技能，若技能未解鎖則回傳 true
     */
    _doUpdateSkill(skill, tier, tree) {
        var availablePoints = this.store.availablePoints;

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
        skill.unlockedBasic = (skill.ownedBasic || (availablePoints >= tier.skillPointBasic));
        skill.unlockedAce = (tier.skillPointAce > 0)
            ? (skill.ownedBasic)
                ? (skill.ownedAce || (availablePoints >= tier.skillPointAce))
                : (availablePoints >= tier.skillPointBasic + tier.skillPointAce)
            : false;
    }

    /**
     * 刷新技能狀態(status)
     *
     * @param Skill 要被處理的技能
     */
    _refreshSkillStatus(skill) {
        skill.status = ((skill) => {
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
