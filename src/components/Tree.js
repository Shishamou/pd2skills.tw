import React, { Component, PropTypes } from 'react';
import Tier from './Tier';

class Tree extends Component
{
	render() {
		const { tree, getTier } = this.props;
		var tiers = tree.tiers.slice().reverse();

		var progressbarPercent = (function(tiers) {
			for (var i = 1; i < tiers.length; i++) {
				var currectTier = getTier(tiers[i]);
				var previousTier = getTier(tiers[i - 1]);

				if (currectTier.unlocked === false) {
					if (i === 1) return 0;
					var range = currectTier.currectUnlockRequire - previousTier.currectUnlockRequire;
					var tierUsed = currectTier.currectUnlockNeeded + range;
					var tierProgress = Math.floor(tierUsed / range * 100 * 0.2);
					var progress = (i - 2) * 20;

					return progress + tierProgress;
				}
			}

			return 100;
		})(tree.tiers);


		return (
			<div className="tree">
				<div className="progressbar" data-percent={progressbarPercent}></div>
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
