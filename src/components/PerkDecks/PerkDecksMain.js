import React, { Component, PropTypes } from 'react';

import Perks from './Perks';

class PerkDecksMain extends Component
{
	render() {
		return (
			<div className="section-main">
				<div className="section-content">
					<Perks {...this.props} />
				</div>
			</div>
		);
	}
}

PerkDecksMain.propTypes = {
};

export default PerkDecksMain;
