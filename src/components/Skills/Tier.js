import React, { Component, PropTypes } from 'react';
import Skill from './Skill';

class Tier extends Component
{
	render() {
		const { tree, tier, tierRank } = this.props;

		var className = ['tier'];
		if (tier.unlocked) className.push('tier-unlocked');
		if (tree.reduced) className.push('tier-reduced');
		className = className.join(' ');

		var currectUnlockRequire = tier.currectUnlockRequire;
		if (currectUnlockRequire < 10)
			currectUnlockRequire = '0' + currectUnlockRequire;

		return (
			<div className={className}>
				<div className="tier-skills">{this.renderSkills()}</div>
				<div className="tier-aside">
					<p>{tierRank}</p>
					<p>{currectUnlockRequire}</p>
				</div>
			</div>
		);
	}

	renderSkills() {
		const { tier, getSkill } = this.props;
		return tier.skills.map(function (skillId, index) {
			var skill = getSkill(skillId);
			return (
				<Skill
					{...this.props}
					key={index}
					skill={skill}
				/>
			);
		}, this)
	}
}

Tier.propTypes = {
	getSkill: PropTypes.func.isRequired,
	tree: PropTypes.object.isRequired,
	tier: PropTypes.object.isRequired,
	tierRank: PropTypes.number.isRequired,
};

export default Tier;
