import React, { Component, PropTypes } from 'react';

import Perk from './Perk';

class Perks extends Component
{
	render() {
		const { perks, activedPerk } = this.props;

		return (
			<div className="perks">
				{perks.map((perk, key) =>
					<Perk
						{...this.props}
						key={key}
						perk={perk}
						actived={activedPerk === key}
					/>
				)}
			</div>
		);
	}
}

Perks.propTypes = {
	perks: PropTypes.array.isRequired,
	activedPerk: PropTypes.number,
};

export default Perks;
