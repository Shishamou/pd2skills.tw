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
		const { app, skill } = this.props;

		var className = ['skill'];
		className.push('status-' + skill.status.split('_').slice(-1).pop().toLowerCase());

		return (
			<div
				className={className.join(' ')}
				onClick={this.handleSkillClick.bind(this)}
				onMouseEnter={this.handleSkillEnter.bind(this)}
				onMouseLeave={this.handleSkillLeave.bind(this)}
			>
				<div className="skill-icon">
					<canvas ref="canvas"/>
				</div>
				<SkillText {...this.props} />
				<div
					className="skill-remove"
					onClick={(e) => this.handleSkillRemove(e).bind(this)}
				/>
			</div>
		);
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
