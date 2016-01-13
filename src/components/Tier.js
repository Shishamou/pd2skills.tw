import React, { Component, PropTypes } from 'react';
import Skill from './Skill';

class Tier extends Component
{
	render() {
		const { id, getTier } = this.props;
		var tier = getTier(id);

		return (
			<div className="tier">
				{tier.skills.map((skillId, index) =>
					<Skill
						{...this.props}
                        key={index}
                        id={skillId}
                    />
				)}
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
