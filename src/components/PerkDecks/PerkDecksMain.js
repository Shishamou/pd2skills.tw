import React, { Component, PropTypes } from 'react';

import Perks from './Perks';

class PerkDecksMain extends Component
{
	constructor(props) {
		super(props);
		this.handleRespec = this.handleRespec.bind(this);
	}

	handleRespec() {
		this.props.respecPerks();
	}

	render() {
		const { locale } = this.props;

		var respec = locale('menu_st_respec_spec_points');

		return (
			<div className="section-main">
				<div className="section-content">
					<Perks {...this.props} />
					<div className="control perks-control">
						<div className="control-content">
							<span className="control-text" id="perk_points">{this.renderTotalPoints()}</span>
							<span>(</span>
							<span className="control-button" onClick={this.handleRespec}>{respec}</span>
							<span>)</span>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderTotalPoints() {
		const { locale, localeText, totalPoints } = this.props;

		return locale('menu_st_spent_xp_perk_total') + localeText(
			(1 == totalPoints)? 'st_menu_point_plural' : 'st_menu_point',
			{ points: totalPoints }
		);
	}
}

PerkDecksMain.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	respecPerks: PropTypes.func.isRequired,
	totalPoints: PropTypes.number.isRequired,
};

export default PerkDecksMain;
