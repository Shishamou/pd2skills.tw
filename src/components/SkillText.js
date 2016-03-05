import React, { Component, PropTypes } from 'react';
import * as statuses from '../constants/SkillStatuses';

class SkillText extends Component
{
	render() {
		const { skill, tier } = this.props;
		const { locale, localeText } = this.props;

		switch (skill.status) {
			case statuses.STATUS_ALERTED:
				return (
					<div className="skill-text">
						<p>必要</p>
					</div>
				);
			case statuses.STATUS_ACED:
				return (
					<div className="skill-text">
						<p>{locale('st_menu_skill_maxed')}</p>
					</div>
				);
			case statuses.STATUS_OWNED:
				if (tier.skillPointAce > 0) {
					return (
						<div className="skill-text">
							<p className="skill-text-hold">{locale('st_menu_skill_owned')}</p>
							<p className="skill-text-hide" dangerouslySetInnerHTML={{
								__html: localeText('st_menu_buy_skill_pro_plural', {
									points: tier.skillPointAce,
									cost: ''//'$' + tier.skillCostAce,
								})
							}} />
						</div>
					);
				} else {
					return (
						<div className="skill-text">
							<p>{locale('st_menu_skill_owned')}</p>
						</div>
					);
				}
			case statuses.STATUS_UNLOCKED:
				return (
					<div className="skill-text">
						<p className="skill-text-hide" dangerouslySetInnerHTML={{
							__html: localeText('st_menu_buy_skill_basic_plural', {
								points: tier.skillPointBasic,
								cost: ''//'$' + tier.skillCostBasic,
							})
						}} />
					</div>
				);
			case statuses.STATUS_LOCKED:
				return (
					<div className="skill-text">
						<p className="skill-text-hide">{locale('st_menu_skill_locked')}</p>
					</div>
				);
		}
	}
}

SkillText.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	skill: PropTypes.object.isRequired,
	tier: PropTypes.object.isRequired,
};

export default SkillText;
