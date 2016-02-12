import React, { Component, PropTypes } from 'react';
import * as statuses from '../constants/SkillStatuses';
import * as events from '../constants/Events';

class Skill extends Component
{
	handleClick(e) {
		this.props.handleEvent(this.props.id, events.CLICK);
	}

	handleMouseEnter(e) {
		this.props.handleEvent(this.props.id, events.MOUSE_ENTER);
	}

	handleMouseLeave(e) {
		this.props.handleEvent(this.props.id, events.MOUSE_LEAVE);
	}

	handleRemove(e) {
		e.stopPropagation();
		this.props.handleEvent(this.props.id, events.REMOVE);
	}

	render() {
		const { id, getSkill, skillPointBasic, skillPointAce } = this.props;
		var skill = getSkill(id);

		var dataset = skill.status.split('_').slice(-1).pop().toLowerCase();
		var content = (function(status) {
			switch (status) {
				case statuses.STATUS_ALERTED:
					return (
						<div className="skill-text">
							<p>必要</p>
						</div>
					);
				case statuses.STATUS_ACED:
					return (
						<div className="skill-text">
							<p>王牌</p>
						</div>
					);
				case statuses.STATUS_OWNED:
					return (skillPointAce > 0)? (
						<div className="skill-text">
							<p className="skill-text-hold">擁有</p>
							<p className="skill-text-hide">購買 王牌<br/>花費 {skillPointAce} 點</p>
						</div>
					) : (
						<div className="skill-text">
							<p>擁有</p>
						</div>
					);
				case statuses.STATUS_UNLOCKED:
					return (
						<div className="skill-text">
							<p className="skill-text-hide">購買 基本<br/>花費 {skillPointBasic} 點</p>
						</div>
					);
				case statuses.STATUS_LOCKED:
					return (
						<div className="skill-text">
							<p className="skill-text-hide">未解鎖</p>
						</div>
					);
			}
		})(skill.status);

		return (
			<div
				className="skill"
				data-status={dataset}
				onClick={(e) => this.handleClick(e)}
				onMouseEnter={(e) => this.handleMouseEnter(e)}
				onMouseLeave={(e) => this.handleMouseLeave(e)}
			>
				{content}
				<div
					className="skill-remove"
					onClick={(e) => this.handleRemove(e)}
				></div>
			</div>
		);
	}
}

Skill.propTypes = {
	id: PropTypes.number.isRequired,
	getTier: PropTypes.func.isRequired,
	getSkill: PropTypes.func.isRequired,
	skillPointBasic: PropTypes.number.isRequired,
	skillPointAce: PropTypes.number,
	handleEvent: PropTypes.func.isRequired,
};

export default Skill;
