import React, { Component, PropTypes } from 'react';
import * as statuses from '../constants/InfamyStatuses';

class Infamy extends Component
{
	render() {
		const { infamy } = this.props;

		var dataset = infamy.status.split('_').slice(-1).pop().toLowerCase();

		return (
			<div
				className="infamy"
				data-status={dataset}
			>
				<p className="infamy-text">{this.text()}</p>
				<div className="infamy-icon"></div>
				<div className="infamy-remove"></div>
			</div>
		);
	}

	text() {
		const { infamy } = this.props;
		const { locale, localeText } = this.props;

		switch (infamy.status) {
			case statuses.STATUS_OWNED:
				return locale('st_menu_skill_owned');
			case statuses.STATUS_DISABLE:
				return locale('st_menu_point', {points: 1});
			case statuses.STATUS_UNLOCKED:
				return 'Disabled';
			case statuses.STATUS_LOCKED:
			default:
				return locale('st_menu_skill_locked');
		}
	}
}

Infamy.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	infamy: PropTypes.object.isRequired,
};

export default Infamy;
