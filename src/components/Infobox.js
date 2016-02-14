import React, { Component, PropTypes } from 'react';

class Infobox extends Component
{
	render() {
		const { display } = this.props;
		this.app = this.props.app;

		if (typeof display.skill !== 'undefined') {
			return this.renderSkill(display.skill);
		}

		return <div className="infobox" />;
	}

	renderSkill(skill) {
		const { localeText, getSkill, getTier } = this.app;
		var skill = getSkill(skill);
		var tier = getTier(skill.tierId);

		var skillDatas = skill.datas || {};

		var pointsToUnlockTier = (function (tier) {
			if (tier.unlocked) return '';
			var needed = (0 - tier.currectUnlockNeeded);
			var locale = (needed == 1)
				? 'st_menu_points_to_unlock_tier_singular'
				: 'st_menu_points_to_unlock_tier';

			return (
				<p className="infobox-block alerted" dangerouslySetInnerHTML={{
					__html: localeText(locale, {
						points: needed,
						tier: tier.tier
					})
				}} />
			);
		})(tier);

		return (
			<div className="infobox">
				<h1 className="infobox-header" dangerouslySetInnerHTML={{
					__html: localeText(`menu_${skill.name}`)
				}} />
				{pointsToUnlockTier}
				<p className="infobox-block" dangerouslySetInnerHTML={{
					__html: localeText(`menu_${skill.name}_desc`, {
						basic: `${tier.skillPointBasic} / ${tier.skillCostBasic}`,
						pro: `${tier.skillPointAce} / ${tier.skillCostAce}`
					})
				}} />
			</div>
		);
	}
}

Infobox.propTypes = {
	display: PropTypes.object.isRequired,
	app: PropTypes.object.isRequired
};

export default Infobox;
