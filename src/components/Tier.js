import React, { Component, PropTypes } from 'react';
import Skill from './Skill';

class Tier extends Component
{
	render() {
		const { id, getTier } = this.props;
		var tier = getTier(id);

		return (
			<div className="tier" data-unlock={tier.unlocked}>
				<div className="tier-skills">
					{tier.skills.map((skillId, index) =>
						<Skill
							{...this.props}
	                        key={index}
	                        id={skillId}
	                    />
					)}
				</div>
				<div className="tier-aside">
					<p>{tier.currectUnlockNeeded}</p>
					<p>{tier.currectUnlockRequire}</p>
				</div>
			</div>
		);
	}
}

Tier.propTypes = {
	id: PropTypes.number.isRequired,
	getTier: PropTypes.func.isRequired,
	getSkill: PropTypes.func.isRequired,
	handleEvent: PropTypes.func.isRequired,
};

export default Tier;
