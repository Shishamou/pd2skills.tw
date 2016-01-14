import { buildSwitcher } from '../redux-reducer-switcher';
import * as events from '../constants/Events';

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
    }

    onRemove(skill) {
        skill.ownedBasic = false;
        skill.ownedAce = false;
    }

    default() {
    }
}

export default buildSwitcher(SkillEvents).resolve;
