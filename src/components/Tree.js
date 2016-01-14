import React, { Component, PropTypes } from 'react';
import Tier from './Tier';

class Tree extends Component
{
	render() {
		const { id, tree, getTier } = this.props;
		var tiers = tree.tiers.slice().reverse();

		return (
			<div className="tree">
				{tiers.map((tierId, index) =>
					<Tier
						{...this.props}
                        key={index}
                        id={tierId}
                    />
				)}
			</div>
		);
	}
}

Tree.propTypes = {
	id: PropTypes.number.isRequired,
	tree: PropTypes.object.isRequired,
	getTier: PropTypes.func.isRequired,
	getSkill: PropTypes.func.isRequired,
	handleEvent: PropTypes.func.isRequired,
};

export default Tree;
