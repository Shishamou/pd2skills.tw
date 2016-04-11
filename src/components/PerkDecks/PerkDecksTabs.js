import React, { Component, PropTypes } from 'react';

class PerkDecksTabs extends Component
{
	constructor(props) {
		super(props);
		this.actived = props.activedPerk;
	}

	componentDidMount() {
		this.componentDidUpdate();
	}

	componentDidUpdate() {
		const { activedPerk } = this.props;

		if (this.actived === activedPerk) return;

		this.actived = activedPerk;
		var node = this.refs[`perk_${activedPerk}`];
		if ( ! node) return;

		console.log(node);
		if (this.shouldScrollTo(node)) {
			node.scrollIntoView({behavior: "auto"});
		}
	}

	shouldScrollTo(element) {
		var container = this.refs.container;

		var scrollLeft = container.scrollLeft;
		var scrollRight = scrollLeft + container.offsetWidth;

		var elementLeft = element.offsetLeft;
		var elementRight = elementLeft + element.offsetWidth;

		if (elementLeft < scrollLeft) return true;
		if (elementRight > scrollRight) return true;

		return false;
	}

	render() {
		const { locale, perks, activedPerk } = this.props;

		return (
			<div className="section-tabs">
				<div className="section-tabs-main" ref="container">
					<div className="section-tabs-contain">
						{perks.map((perk, index) =>
							<div key={index}
								className={(index === activedPerk)? 'section-tab actived' : 'section-tab'}
								ref={`perk_${index}`}
								onClick={(e) => {this.props.onClick(index)}}
							>
								<span>{locale(`menu_st_spec_${perk.name}`)}</span>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

PerkDecksTabs.propTypes = {
	locale: PropTypes.func.isRequired,
	perks: PropTypes.array.isRequired,
	activedPerk: PropTypes.number,
};

export default PerkDecksTabs;
