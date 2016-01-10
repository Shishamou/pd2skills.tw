import { buildSwitcher } from '../redux-reducer-switcher';
import * as events from '../constants/Events';

class SkillEvents {
    switcher() {
        return {
            [events.CLICK]: this.onClick,
        };
    }

    onClick(skill) {
        if ( ! skill.own_basic) {
            // if (skill.unlock_basic)
                skill.own_basic = true;
        } else if ( ! skill.own_ace) {
            // if (skill.unlock_ace)
                skill.own_ace = true;
        }
    }

    default() {
        if ( ! skill.own_basic) {
            // if (skill.unlock_basic)
                skill.own_basic = true;
        } else if ( ! skill.own_ace) {
            // if (skill.unlock_ace)
                skill.own_ace = true;
        }
    }
}

export default buildSwitcher(SkillEvents).resolve;
