import React, { Component, PropTypes } from 'react';

import Deck from './Deck';

class Perk extends Component
{
	render() {
		const { locale, localeText } = this.props;
		const { perk, getDeck } = this.props;

		return (
			<div className="perk">
				<div className="perk-header">{localeText(`menu_st_spec_${perk.name}`)}</div>
				<div className="decks">
					{perk.decks.map((deck, tier) =>
						<Deck
							{...this.props}
							key={tier}
							deck={getDeck(deck)}
							isOwned={(perk.tier === tier + 1)}
						/>
					)}
				</div>
			</div>
		);
	}
}

Perk.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	getDeck: PropTypes.func.isRequired,
	perk: PropTypes.object.isRequired
};

export default Perk;
