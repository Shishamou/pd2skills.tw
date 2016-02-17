import * as events from '../constants/Events';
import * as statuses from '../constants/SkillStatuses';

class SkillsHandler {
    constructor() {
        this.skillSearchTemp = {};
    }

    handleSkills(state = {}, action) {
        this.store = state;
        var currectSkill = this.getSkill(action.id);

        switch (action.event) {
            case events.CLICK:
                this.handleClick(currectSkill);
                break;
            case events.MOUSE_ENTER:
                this.handleMouseEnter(currectSkill);
                break;
            case events.MOUSE_LEAVE:
                this.handleMouseLeave(currectSkill);
                break;
            case events.REMOVE:
                this.handleRemove(currectSkill);
                break;
            default:
                return state;
        }

        this.updateTreeState(this.getTree(currectSkill.treeId));
        this.refreshSkillsStatus();

        return Object.assign({}, state, {
            trees: state.trees.slice(),
            tiers: state.tiers.slice(),
            skills: state.skills.slice()
        });
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

    handleMouseEnter(skill) {
        this._handleMouse(skill, true);
    }

    handleMouseLeave(skill) {
        this._handleMouse(skill, false);
    }

    _handleMouse(skill, hover = true) {
        if (hover) {
            this.store.displayInformation = { skill: skill.id };
        }

        // 更新前置技能
        if (skill.requiredSkill) {
            var requiredSkill = this.getSkillByName(skill.requiredSkill, true);
            requiredSkill.alerted = (requiredSkill.ownedBasic || ( ! hover))
                ? false
                : hover;
        }
    }

    handleRemove(skill) {
        skill.ownedBasic = false;
        skill.ownedAce = false;
    }

    // =========================================================================
    // = Commands
    // =========================================================================

    /**
     * 更新技能樹
     */
    updateTreeState(tree) {
        tree.spendPoints = 0;
        tree.spendCosts = 0;

        tree.tiers.forEach((tier) => {
            tier = this.getTier(tier);
            this.updateTreeStateHandleTier(tier, tree);
        }, this);
    }

    /**
     * 更新技能樹階層
     */
    updateTreeStateHandleTier(tier, tree) {
        // 判斷是否有惡名減免
        tier.currectUnlockRequire = (tree.reduced)
            ? tier.tierUnlockRequireReduced
            : tier.tierUnlockRequire;

        // 計算解鎖需求與更新解鎖狀態
        tier.currectUnlockNeeded = tree.spendPoints - tier.currectUnlockRequire;
        tier.unlocked = (tier.currectUnlockNeeded >= 0);

        // 迭代處理階層技能
        tier.skills.forEach((skill) => {
            skill = this.getSkill(skill);
            this.updateTreeStateHandleSkill(skill, tier, tree);
        }, this);
    }

    /**
     * 更新技能樹技能
     */
    updateTreeStateHandleSkill(skill, tier, tree) {
        var clearSkill = this.updateTreeStateHandleSkillUpdate(skill, tier, tree);
        if (clearSkill) {
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
     * 更新技能樹技能狀態
     */
    updateTreeStateHandleSkillUpdate(skill, tier, tree) {
        // 檢查階層解鎖
        skill.tierUnlocked = tier.unlocked;
        if ( ! skill.tierUnlocked) {
            return true;
        }

        // 檢查前置技能解鎖
        if (skill.requiredSkill) {
            var requiredSkill = this.getSkillByName(skill.requiredSkill, true);
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
    // = Fetch
    // =========================================================================

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
    }
}

var skillsHandler = new SkillsHandler;
export default skillsHandler.handleSkills.bind(skillsHandler);
