import React, { Component, PropTypes } from 'react';

class Deck extends Component
{
	render() {
		const { locale, localeText } = this.props;
		const { deck, isOwned } = this.props;

		return (
			<div className="deck" data-owned={isOwned}>
				<div className="deck-icon"></div>
			</div>
		);
	}
}

Deck.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	deck: PropTypes.object.isRequired,
	isOwned: PropTypes.bool.isRequired,
};

export default Deck;
