import React, { Component, PropTypes } from 'react';
import Skill from './Skill';

class Tier extends Component
{
	render() {
		const { app, tier, tierRank } = this.props;

		var skills = tier.skills.map(function (skillId, index) {
			var skill = app.getSkill(skillId);
			return (
				<Skill
					{...this.props}
					key={index}
					skill={skill}
					skillPointBasic={tier.skillPointBasic}
					skillPointAce={tier.skillPointAce}
				/>
			);
		}, this);

		return (
			<div className="tier" data-unlocked={tier.unlocked}>
				<div className="tier-skills">{skills}</div>
				<div className="tier-aside">
					<p>{tierRank}</p>
					<p>{tier.currectUnlockRequire}</p>
				</div>
			</div>
		);
	}
}

Tier.propTypes = {
	app: PropTypes.object.isRequired,
	handleSkillEvent: PropTypes.func.isRequired,
	tier: PropTypes.object.isRequired,
	tierRank: PropTypes.number.isRequired,
};

export default Tier;
