import React, { Component, PropTypes } from 'react';
import Skill from './Skill';

class Tier extends Component
{
	render() {
		const { tier, tierRank, getSkill } = this.props;

		var skills = tier.skills.map(function (skillId, index) {
			var skill = getSkill(skillId);
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
	getSkill: PropTypes.func.isRequired,
	tier: PropTypes.object.isRequired,
	tierRank: PropTypes.number.isRequired,
};

export default Tier;
