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
     * 刷新技能樹
     *
     * @param integer 要更新的技能樹 id，若省略則更新所有技能樹階層
     */
    refreshSkillTrees(targetId) {
        this.updateTreeTiersAndCountSpendPoints(targetId);
        this.updateTreeSkills(targetId);
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
    updateTreeTiersAndCountSpendPoints(targetId = null) {
        var spendPoints = this.store.trees.map((tree) =>
            (targetId === null || tree.id == targetId)
                ? this._updateTreeTier(tree)
                : tree.spendPoints
        );
        var totalSpendPoints = spendPoints.reduce((prev, curr) => prev + curr);

        this.store.totalSpendPoints = totalSpendPoints;
        this.store.availablePoints = this.totalAvailablePoints - totalSpendPoints;
    }

    /**
     * 更新技能樹階層
     *
     * @param Tree 要被處理的技能樹
     * @return integer 技能樹花費的點數
     */
    _updateTreeTier(tree) {
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
    updateTreeSkills(targetId = null) {
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
            throw 'updateSkillState: arg1 must be Skill Object';
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

export default new SkillsHandler;
