import React, { Component, PropTypes } from 'react';
import * as statuses from '../constants/SkillStatuses';

class SkillText extends Component
{
	render() {
		const { skill, skillPointBasic, skillPointAce } = this.props;
		const { locale, localeText } = this.props;

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
		this.handleSkillClick = this.handleSkillClick.bind(this);
		this.handleSkillRemove = this.handleSkillRemove.bind(this);
		this.handleSkillEnter = this.handleSkillEnter.bind(this);
		this.handleSkillLeave = this.handleSkillLeave.bind(this);
	}

	handleSkillClick(e) {
		this.props.handleSkillClick(this.props.skill.id);
	}

	handleSkillRemove(e) {
		e.stopPropagation();
		this.props.handleSkillRemove(this.props.skill.id);
	}

	handleSkillEnter(e) {
		this.props.handleSkillEnter(this.props.skill.id);
	}

	handleSkillLeave(e) {
		this.props.handleSkillLeave(this.props.skill.id);
	}



	render() {
		const { app, skill } = this.props;

		var dataset = skill.status.split('_').slice(-1).pop().toLowerCase();

		return (
			<div
				className="skill"
				data-status={dataset}
				onClick={this.handleSkillClick}
				onMouseEnter={this.handleSkillEnter}
				onMouseLeave={this.handleSkillLeave}
			>
				<SkillText {...this.props} />
				<div
					className="skill-remove"
					onClick={(e) => this.handleSkillRemove(e)}
				></div>
			</div>
		);
	}
}

Skill.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	handleSkillClick: PropTypes.func.isRequired,
	handleSkillRemove: PropTypes.func.isRequired,
	handleSkillEnter: PropTypes.func.isRequired,
	handleSkillLeave: PropTypes.func.isRequired,
	skill: PropTypes.object.isRequired,
	tierRank: PropTypes.number.isRequired,
	skillPointBasic: PropTypes.number.isRequired,
	skillPointAce: PropTypes.number,
};

export default Skill;
