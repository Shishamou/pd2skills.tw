import React, { Component, PropTypes } from 'react';
import * as statuses from '../constants/InfamyStatuses';

class Infamy extends Component
{
	constructor(props) {
		super(props);
		this.handleInfamyClick = this.handleInfamyClick.bind(this);
		this.handleInfamyRemove = this.handleInfamyRemove.bind(this);
		this.handleInfamyEnter = this.handleInfamyEnter.bind(this);
		this.handleInfamyLeave = this.handleInfamyLeave.bind(this);
	}

	handleInfamyClick(e) {
		this.props.handleInfamyClick(this.props.infamy.id);
	}

	handleInfamyRemove(e) {
		e.stopPropagation();
		this.props.handleInfamyRemove(this.props.infamy.id);
	}

	handleInfamyEnter(e) {
		this.props.handleInfamyEnter(this.props.infamy.id);
	}

	handleInfamyLeave(e) {
		this.props.handleInfamyLeave(this.props.infamy.id);
	}

	render() {
		const { infamy } = this.props;

		var dataset = infamy.status.split('_').slice(-1).pop().toLowerCase();

		return (
			<div className="infamy"
				data-status={dataset}
				onClick={this.handleInfamyClick}
				onMouseEnter={this.handleInfamyEnter}
				onMouseLeave={this.handleInfamyLeave}
			>
				<p className="infamy-text">{this.text()}</p>
				<div className="infamy-icon"></div>
				<div className="infamy-remove"
					onClick={(e) => this.handleInfamyRemove(e)}
				></div>
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
				return 'Disabled';
			case statuses.STATUS_UNLOCKED:
				return locale('st_menu_point', {points: 1});
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
	handleInfamyClick: PropTypes.func.isRequired,
	handleInfamyRemove: PropTypes.func.isRequired,
	handleInfamyEnter: PropTypes.func.isRequired,
	handleInfamyLeave: PropTypes.func.isRequired,
};

export default Infamy;
