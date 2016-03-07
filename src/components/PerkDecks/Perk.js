import React, { Component, PropTypes } from 'react';

import Deck from './Deck';

class Perk extends Component
{
	render() {
		const { locale, localeText } = this.props;
		const { perk, getDeck, actived } = this.props;
		const { equipped } = perk;

		var header = locale(`menu_st_spec_${perk.name}`);
		header = (equipped)
			? localeText('menu_st_active_spec', {specialization: header})
			: header;

		var className = ['perk'];
		if (perk.equipped) className.push('equipped');
		if (actived) className.push('actived');

		return (
			<div
				className={className.join(' ')}
				onClick={(e) => this.props.handlePerkClick(perk.id)}
				onDoubleClick={(e) => this.props.handlePerkDouble(perk.id)}
			>
				<div className="perk-header">{header}</div>
				<div className="decks">
					{perk.decks.map((deck, tier) =>
						<Deck
							{...this.props}
							key={tier}
							deck={getDeck(deck)}
							isOwned={(perk.tier > tier)}
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
	handlePerkClick: PropTypes.func.isRequired,
	handlePerkDouble: PropTypes.func.isRequired,
	getDeck: PropTypes.func.isRequired,
	perk: PropTypes.object.isRequired,
	actived: PropTypes.bool,
};

export default Perk;
