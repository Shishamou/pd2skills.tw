import React, { Component, PropTypes } from 'react';

import Perk from './Perk';

class Perks extends Component
{
	render() {
		return (
			<div className="perks">
				{this.props.perks.map((perk, key) =>
					<Perk {...this.props} key={key} perk={perk} />
				)}
			</div>
		);
	}
}

Perks.propTypes = {
	perks: PropTypes.array.isRequired
};

export default Perks;
