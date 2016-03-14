import React, { Component, PropTypes } from 'react';
import * as statuses from '../../constants/SkillStatuses';

class SkillText extends Component
{
	render() {
		const { skill, tier, tree } = this.props;
		const { locale, localeText } = this.props;

		const parseCost = (cost) => ((0)? '$'+ cost : '');

		switch (skill.status) {
			case statuses.STATUS_ALERTED:
				return (
					<div className="skill-text-content">
						<p>必要</p>
					</div>
				);
			case statuses.STATUS_ACED:
				return (
					<div className="skill-text-content">
						<p>{locale('st_menu_skill_maxed')}</p>
					</div>
				);
			case statuses.STATUS_OWNED:
				if (tier.skillPointAce > 0) {
					return (
						<div className="skill-text-content">
							<p className="skill-text-hold">{locale('st_menu_skill_owned')}</p>
							<p className="skill-text-hide" dangerouslySetInnerHTML={{
								__html: localeText('st_menu_buy_skill_pro_plural', {
									points: tier.skillPointAce,
									cost: parseCost(tier.skillCostAce),
								})
							}} />
						</div>
					);
				} else {
					return (
						<div className="skill-text-content">
							<p className="skill-text-hide">{locale('st_menu_profession_unlocked', {
								profession: locale(`st_menu_${tree.name}`)
							})}</p>
						</div>
					);
				}
			case statuses.STATUS_UNLOCKED:
				return (
					<div className="skill-text-content">
						<p className="skill-text-hide" dangerouslySetInnerHTML={{
							__html: localeText('st_menu_buy_skill_basic_plural', {
								points: tier.skillPointBasic,
								cost: parseCost(tier.skillCostBasic),
							})
						}} />
					</div>
				);
			case statuses.STATUS_LOCKED:
				return (
					<div className="skill-text-content">
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
	tree: PropTypes.object.isRequired,
};

export default SkillText;
