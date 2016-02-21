import React, { Component, PropTypes } from 'react';

class InfamySide extends Component
{
	render() {
		return (
			<div className="section-aside">{this.renderContent()}</div>
		);
	}

	renderContent() {
		const { locale, localeText } = this.props;

		const infamy = this.props.display;
		if ( ! infamy) return;

		var pointsToUnlockTier = this.pointsToUnlockTier(tier);
		var desc = this.desc(skill, tier);

		return (
			<div className="infobox">
				<h1 className="infobox-header" dangerouslySetInnerHTML={{
					__html: localeText(`menu_infamy_name_${infamy.name}`)
				}} />
				{this.pointsToUnlock(infamy)}
				<p className="infobox-block" dangerouslySetInnerHTML={{
					__html: this.desc(infamy)
				}} />
			</div>
		);
	}

	pointsToUnlock(infamy) {
		if (infamy.unlocked) return;
		const { localeText } = this.props;

		var content = (infamy.disable)
			? 'Infamy Disable'
			: localeText('menu_infamy_unlock_prev_tier');
		return (
			<p className="infobox-block alerted" dangerouslySetInnerHTML={{ __html: content }} />
		);
	}

	desc(infamy) {
		return this.props.localeText(`menu_infamy_desc_${infamy.name}`, infamy.datas || {});
	}
}

InfamySide.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	display: PropTypes.object,
};

export default InfamySide;
