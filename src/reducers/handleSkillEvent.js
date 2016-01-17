import { buildSwitcher } from '../redux-reducer-switcher';
import * as events from '../constants/Events';
import * as statuses from '../constants/SkillStatuses';

class SkillEvents {
    constructor(hooks) {
        hooks.addHookBefore((state, action) => {
            state.skills = state.skills.slice();
            this.state = state;
            return this.currectSkill = state.skills[action.id];
        });

        hooks.addHookAfter((skill) => {
            this.updateSkillStatus(this.currectSkill);
            return this.state;
        })
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
            // if (skill.unlockBasic)
                skill.ownedBasic = true;
        } else if ( ! skill.ownedAce) {
            // if (skill.unlockAce)
                skill.ownedAce = true;
        }
    }

    handleRemove(skill) {
        skill.ownedBasic = false;
        skill.ownedAce = false;
    }

    default() {
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
}

export default buildSwitcher(SkillEvents).resolve;
