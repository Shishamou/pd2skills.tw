import React, { Component, PropTypes } from 'react';

class SkillsSide extends Component
{
	render() {
		return (
			<div className="section-aside">{this.renderContent()}</div>
		);
	}

	renderContent() {
		const { display, getSkill, getTier } = this.props;
		const { locale, localeText } = this.props;

		if (display === null) return;

		var skill = getSkill(display);
		var tier = getTier(skill.tierId);

		var pointsToUnlockTier = this.pointsToUnlockTier(tier);
		var desc = this.desc(skill, tier);

		return (
			<div className="infobox">
				<h1 className="infobox-header" dangerouslySetInnerHTML={{
					__html: localeText(`menu_${skill.name}`)
				}} />
				{pointsToUnlockTier}
				<p className="infobox-block" dangerouslySetInnerHTML={{
					__html: desc
				}} />
			</div>
		);
	}

	pointsToUnlockTier(tier) {
		if (tier.unlocked) return '';
		const { locale, localeText } = this.props;

		var needed = (0 - tier.currectUnlockNeeded);
		var local = (needed == 1)
			? 'st_menu_points_to_unlock_tier_singular'
			: 'st_menu_points_to_unlock_tier';

		return (
			<p className="infobox-block alerted" dangerouslySetInnerHTML={{
				__html: localeText(local, {
					points: needed,
					tier: tier.tier
				})
			}} />
		);
	}

	desc(skill, tier) {
		const { locale, localeText } = this.props;
		var datas = skill.datas || {};
		var basic, pro;

		basic = `${tier.skillPointBasic} / ${tier.skillCostBasic}`;
		basic = (skill.unlockedBasic)? basic : `<span class="alerted">${basic}</span>`;

		pro = `${tier.skillPointAce} / ${tier.skillCostAce}`;
		pro = (skill.unlockedAce)? pro : `<span class="alerted">${pro}</span>`;

		return localeText(`menu_${skill.name}_desc`, Object.assign(datas, { basic, pro }));
	}
}

SkillsSide.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	getTier: PropTypes.func.isRequired,
	getSkill: PropTypes.func.isRequired,
	display: PropTypes.number,
};

export default SkillsSide;
