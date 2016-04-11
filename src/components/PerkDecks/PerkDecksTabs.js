import React, { Component, PropTypes } from 'react';

class PerkDecksTabs extends Component
{
	render() {
		const { locale, perks, activedPerk } = this.props;

		return (
			<div className="section-tabs">
				<div className="section-tabs-main">
					<div className="section-tabs-contain">
						{perks.map((perk, index) =>
							<div key={index}
								className={(index === activedPerk)? 'section-tab actived' : 'section-tab'}
							>
								<span>{locale(`menu_st_spec_${perk.name}`)}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

PerkDecksTabs.propTypes = {
	locale: PropTypes.func.isRequired,
	perks: PropTypes.array.isRequired,
	activedPerk: PropTypes.number,
};

export default PerkDecksTabs;
