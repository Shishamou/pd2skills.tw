import React, { Component, PropTypes } from 'react';
import * as statuses from '../constants/SkillStatuses';
import * as events from '../constants/Events';

class Skill extends Component
{
	constructor() {
		super();

		this.contents = {
			[statuses.STATUS_ACED]: (
				<p>王牌</p>
			),
			[statuses.STATUS_OWNED]: (
				<div className="text-group">
					<p>擁有</p>
					<p className="text-hide">購買 王牌<br/>花費 3 點</p>
				</div>
			),
			[statuses.STATUS_UNLOCKED]: (
				<div className="text-group">
					<p className="text-hide">購買 基本<br/>花費 1 點</p>
				</div>
			),
			[statuses.STATUS_LOCKED]: (
				<div className="text-group">
					<p className="text-hide">未解鎖</p>
				</div>
			),
		};
	}

	handleClick(e) {
		this.props.handleEvent(this.props.id, events.CLICK);
	}

	render() {
		const status = this.props.status;

		var dataset = status.split('_').slice(-1).pop().toLowerCase();
		var content = this.contents[status];

		return (
			<div
				className="skill"
				onClick={e => this.handleClick(e)}
				data-status={dataset}
			>
				<div className="skill-icon"></div>
				<div className="skill-text">{content}</div>
				<div className="skill-remove"></div>
			</div>
		);
	}
}

Skill.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired,
	handleEvent: PropTypes.func.isRequired,
};

export default Skill;
