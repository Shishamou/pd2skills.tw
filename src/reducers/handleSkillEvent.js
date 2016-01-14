import { buildSwitcher } from '../redux-reducer-switcher';
import * as events from '../constants/Events';
import * as statuses from '../constants/SkillStatuses';

class SkillEvents {
    switcher() {
        return {
            [events.CLICK]: this.onClick,
            [events.MOUSE_ENTER]: this.onClick,
            [events.MOUSE_LEAVE]: this.onClick,
            [events.REMOVE]: this.onRemove,
        };
    }

    onClick(skill) {
        if ( ! skill.ownedBasic) {
            // if (skill.unlockBasic)
                skill.ownedBasic = true;
        } else if ( ! skill.ownedAce) {
            // if (skill.unlockAce)
                skill.ownedAce = true;
        }

        this.updateSkillStatus(skill);
    }

    onRemove(skill) {
        skill.ownedBasic = false;
        skill.ownedAce = false;
        this.updateSkillStatus(skill);
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
