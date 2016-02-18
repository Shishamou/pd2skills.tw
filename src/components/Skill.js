import React, { Component, PropTypes } from 'react';
import * as statuses from '../constants/SkillStatuses';
import * as events from '../constants/Events';

class SkillText extends Component
{
	render() {
		const { skill, skillPointBasic, skillPointAce } = this.props;
		const { locale, localeText } = this.props.app;

		switch (skill.status) {
			case statuses.STATUS_ALERTED:
				return (
					<div className="skill-text">
						<p>必要</p>
					</div>
				);
			case statuses.STATUS_ACED:
				return (
					<div className="skill-text">
						<p>{locale('st_menu_skill_maxed')}</p>
					</div>
				);
			case statuses.STATUS_OWNED:
				if (skillPointAce > 0) {
					return (
						<div className="skill-text">
							<p className="skill-text-hold">{locale('st_menu_skill_owned')}</p>
							<p className="skill-text-hide">購買 王牌<br/>花費 {skillPointAce} 點</p>
						</div>
					);
				} else {
					return (
	   					<div className="skill-text">
	   						<p>{locale('st_menu_skill_owned')}</p>
	   					</div>
	   				);
				}
			case statuses.STATUS_UNLOCKED:
				return (
					<div className="skill-text">
						<p className="skill-text-hide">購買 基本<br/>花費 {skillPointBasic} 點</p>
					</div>
				);
			case statuses.STATUS_LOCKED:
				return (
					<div className="skill-text">
						<p className="skill-text-hide">{locale('st_menu_skill_locked')}</p>
					</div>
				);
		}
	}
}

class Skill extends Component
{
	constructor(props) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.handleMouseEnter = this.handleMouseEnter.bind(this);
		this.handleMouseLeave = this.handleMouseLeave.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
	}

	handleClick(e) {
		this.props.handleSkillEvent(this.props.skill.id, events.CLICK);
	}

	handleMouseEnter(e) {
		this.props.handleSkillEvent(this.props.skill.id, events.MOUSE_ENTER);
	}

	handleMouseLeave(e) {
		this.props.handleSkillEvent(this.props.skill.id, events.MOUSE_LEAVE);
	}

	handleRemove(e) {
		e.stopPropagation();
		this.props.handleSkillEvent(this.props.skill.id, events.REMOVE);
	}

	render() {
		const { app, skill } = this.props;

		var dataset = skill.status.split('_').slice(-1).pop().toLowerCase();

		return (
			<div
				className="skill"
				data-status={dataset}
				onClick={this.handleClick}
				onMouseEnter={this.handleMouseEnter}
				onMouseLeave={this.handleMouseLeave}
			>
				<SkillText {...this.props} />
				<div
					className="skill-remove"
					onClick={(e) => this.handleRemove(e)}
				></div>
			</div>
		);
	}
}

Skill.propTypes = {
	app: PropTypes.object.isRequired,
	handleSkillEvent: PropTypes.func.isRequired,
	skill: PropTypes.object.isRequired,
	tierRank: PropTypes.number.isRequired,
	skillPointBasic: PropTypes.number.isRequired,
	skillPointAce: PropTypes.number,
};

export default Skill;
