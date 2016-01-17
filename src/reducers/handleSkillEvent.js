import { buildSwitcher } from '../redux-reducer-switcher';
import * as events from '../constants/Events';
import * as statuses from '../constants/SkillStatuses';

class SkillEvents {
    // =========================================================================
    // = Switcher
    // =========================================================================
    constructor(hooks) {
        // 取出要處理的 Skill 並傳入
        hooks.addHookBefore((state, action) => {
            this.state = state;
            return this.currectSkill = this.getSkill(action.id);
        });

        // 更新技能樹
        hooks.addHookAfter(() => {
            this.updateTreeState(this.currectSkill.treeId);
            return this.state;
        });

        // 複製刷新 State
        hooks.addHookAfter((state) => {
            state.trees = state.trees.slice();
            state.tiers = state.tiers.slice();
            state.skills = state.skills.slice();
            return state;
        });
    }

    switcher() {
        return {
            [events.CLICK]: this.handleClick,
            [events.MOUSE_ENTER]: this.handleClick,
            [events.MOUSE_LEAVE]: this.handleClick,
            [events.REMOVE]: this.handleRemove,
        };
    }

    handleClick(skill) {
        if ( ! skill.ownedBasic) {
            if (skill.unlockedBasic)
                skill.ownedBasic = true;
        } else if ( ! skill.ownedAce) {
            if (skill.unlockedAce)
                skill.ownedAce = true;
        }
    }

    handleRemove(skill) {
        skill.ownedBasic = false;
        skill.ownedAce = false;
    }

    default() {
    }

    // =========================================================================
    // = Commands
    // =========================================================================

    updateTreeState(tree) {
        tree = this.getTree(tree);
        tree.spendPoints = 0;
        tree.spendCosts = 0;

        tree.tiers.forEach((tier) => {
            tier = this.getTier(tier);
            this.updateTreeStateHandleTier(tier, tree);
        }, this);
    }

    updateTreeStateHandleTier(tier, tree) {
        tier.currectUnlockRequire = (tree.reduced)
            ? tier.tierUnlockRequireReduced
            : tier.tierUnlockRequire;

        tier.currectUnlockNeeded = tree.spendPoints - tier.currectUnlockRequire;
        tier.unlocked = (tier.currectUnlockNeeded >= 0);

        tier.skills.forEach((skill) => {
            skill = this.getSkill(skill);
            this.updateTreeStateHandleSkill(skill, tier, tree);
        }, this);
    }

    updateTreeStateHandleSkill(skill, tier, tree) {
        if (tier.unlocked) {
            if (skill.ownedBasic) {
                tree.spendPoints += tier.skillPointBasic;
                tree.spendCosts += tier.skillCostBasic;
            }

            if (skill.ownedAce) {
                tree.spendPoints += tier.skillPointAce;
                tree.spendCosts += tier.skillCostAce;
            }

            var availablePoint = tree.availablePoint - tree.spendPoints;
            skill.unlockedBasic = (skill.ownedBasic || (availablePoint >= tier.skillPointBasic));
            skill.unlockedAce = (tier.skillPointAce >= 0)
                ? (skill.ownedBasic)
                    ? (skill.ownedAce || (availablePoint >= tier.skillPointAce))
                    : (availablePoint >= tier.skillPointBasic + tier.skillPointAce)
                : false;
        } else {
            skill.unlockedBasic = false;
            skill.unlockedAce = false;
            skill.ownedBasic = false;
            skill.ownedAce = false;
        }

        this.updateSkillStatus(skill);
    }

    updateSkillStatus(skill) {
        skill.status = (function(skill) {
            if (skill.alerted) return statuses.STATUS_ALERTED;
            if (skill.ownedAce) return statuses.STATUS_ACED;
            if (skill.ownedBasic) return statuses.STATUS_OWNED;
            if (skill.unlockedBasic) return statuses.STATUS_UNLOCKED;
            return statuses.STATUS_LOCKED;
        })(skill);
    }

    // =========================================================================
    // = Methods
    // =========================================================================

    getTree(id) {
        return this.state.trees[id];
    }

    getTier(id) {
        return this.state.tiers[id];
    }

    getSkill(id) {
        return this.state.skills[id];
    }
}

export default buildSwitcher(SkillEvents).resolve;
