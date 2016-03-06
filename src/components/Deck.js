import React, { Component, PropTypes } from 'react';

class Deck extends Component
{
	constructor(props) {
		super(props);
		this.hover = false;
	}

	componentDidMount() {
		this.componentDidUpdate();
	}

	componentDidUpdate() {
		const { deck, isOwned } = this.props;
		this.props.reflowCanvas(this.refs.canvas, {
			hover: this.hover, deck, isOwned
		});
	}

	render() {
		const { locale, localeText } = this.props;
		const { deck, isOwned } = this.props;

		var className = ['deck'];
		if (isOwned) className.push('deck-owned');

		return (
			<div
				className={className.join(' ')}
				onClick={(e) => this.props.handleDeckClick(deck.id)}
				onMouseEnter={(e) => this.props.handleDeckEnter(deck.id)}
				onMouseLeave={(e) => this.props.handleDeckLeave(deck.id)}
				>
				<div className="deck-icon">
					<canvas ref="canvas"/>
				</div>
			</div>
		);
	}
}

Deck.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	reflowCanvas: PropTypes.func.isRequired,
	handleDeckClick: PropTypes.func.isRequired,
	handleDeckEnter: PropTypes.func.isRequired,
	handleDeckLeave: PropTypes.func.isRequired,
	deck: PropTypes.object.isRequired,
	isOwned: PropTypes.bool.isRequired,
};

export default Deck;
