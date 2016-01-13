import React, { Component, PropTypes } from 'react';
import * as statuses from '../constants/SkillStatuses';
import * as events from '../constants/Events';

class Skill extends Component
{
	handleClick(e) {
		this.props.handleEvent(this.props.id, events.CLICK);
	}

	render() {
		const { id, getSkill } = this.props;
		var skill = getSkill(id);

		var dataset = skill.status.split('_').slice(-1).pop().toLowerCase();
		var content = {
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
			)
		}[skill.status];

		return (
			<div
				className="skill"
				data-status={dataset}
				onClick={e => this.handleClick(e)}
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
	getTier: PropTypes.func.isRequired,
	getSkill: PropTypes.func.isRequired,
	handleEvent: PropTypes.func.isRequired,
};

export default Skill;
