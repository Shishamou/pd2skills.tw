import React, { Component, PropTypes } from 'react';
import Tier from './Tier';

class Tree extends Component
{
	render() {
		const { tree, getTier } = this.props;
		var tiers = tree.tiers.slice().reverse();

		return (
			<div className="tree">
				<div className="progressbar" data-percent="50"></div>
				{tiers.map((tierId, index) =>
					<Tier
						{...this.props}
						key={index}
                        id={tierId}
						tierRank={6 - index}
                    />
				)}
			</div>
		);
	}
}

Tree.propTypes = {
	tree: PropTypes.object.isRequired,
	getTier: PropTypes.func.isRequired,
	getSkill: PropTypes.func.isRequired,
	handleEvent: PropTypes.func.isRequired,
};

export default Tree;
