import React, { Component, PropTypes } from 'react';

class Deck extends Component
{
	render() {
		const { locale, localeText } = this.props;
		const { deck, isOwned } = this.props;

		return (
			<div
				className="deck"
				data-owned={isOwned}
				onClick={(e) => this.props.handleDeckClick(deck.id)}
				onMouseEnter={(e) => this.props.handleDeckEnter(deck.id)}
				onMouseLeave={(e) => this.props.handleDeckLeave(deck.id)}
				>
				<div className="deck-icon"></div>
			</div>
		);
	}
}

Deck.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	handleDeckClick: PropTypes.func.isRequired,
	handleDeckEnter: PropTypes.func.isRequired,
	handleDeckLeave: PropTypes.func.isRequired,
	deck: PropTypes.object.isRequired,
	isOwned: PropTypes.bool.isRequired,
};

export default Deck;
