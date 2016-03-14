import React, { Component, PropTypes } from 'react';
import SkillText from './SkillText';

class Skill extends Component
{
	constructor(props) {
		super(props);
		this.hover = false;
	}

	componentDidMount() {
		this.componentDidUpdate();
	}

	componentDidUpdate() {
		const { skill, tier } = this.props;
		this.props.reflowCanvas(this.refs.canvas, {
			hover: this.hover, skill, tier
		});
	}

	render() {
		var events = {
			onClick: this.handleSkillClick.bind(this),
			onMouseEnter: this.handleSkillEnter.bind(this),
			onMouseLeave: this.handleSkillLeave.bind(this)
		};

		return (
			<div className={this.getClassName()} {...events}>
				<div className="skill-icon">
					<canvas ref="canvas"/>
				</div>
				<div className="skill-text">
					<SkillText {...this.props} />
				</div>
				<div className="skill-remove" onClick={(e) => this.handleSkillRemove(e)} />
			</div>
		);
	}

	getClassName() {
		const { skill } = this.props;

		var className = ['skill'];

		(function() {
			if (skill.alerted)
				return className.push('skill-alerted');
			if (skill.ownedAce)
				return className.push('skill-aced');
			if (skill.ownedBasic)
				return className.push('skill-owned');
			if (skill.tierUnlocked)
				return className.push('skill-unlocked');
			return className.push('skill-locked');
		})();

		return className.join(' ');
	}

	handleSkillClick(e) {
		this.props.handleSkillClick(this.props.skill.id);
	}

	handleSkillRemove(e) {
		e.stopPropagation();
		this.props.handleSkillRemove(this.props.skill.id);
	}

	handleSkillEnter(e) {
		this.hover = true;
		this.props.handleSkillEnter(this.props.skill.id);
	}

	handleSkillLeave(e) {
		this.hover = false;
		this.props.handleSkillLeave(this.props.skill.id);
	}
}

Skill.propTypes = {
	reflowCanvas: PropTypes.func.isRequired,
	handleSkillClick: PropTypes.func.isRequired,
	handleSkillRemove: PropTypes.func.isRequired,
	handleSkillEnter: PropTypes.func.isRequired,
	handleSkillLeave: PropTypes.func.isRequired,
	skill: PropTypes.object.isRequired,
	tier: PropTypes.object.isRequired,
	tierRank: PropTypes.number.isRequired,
};

export default Skill;
