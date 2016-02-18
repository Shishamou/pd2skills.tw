import React, { Component, PropTypes } from 'react';
import Tier from './Tier';

class Tree extends Component
{
	render() {
		const { app, tree } = this.props;
		var tiers = tree.tiers.slice().reverse();

		var progressbarPercent = (function(tiers) {
			for (var i = 1; i < tiers.length; i++) {
				var currectTier = app.getTier(tiers[i]);
				var previousTier = app.getTier(tiers[i - 1]);

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

		var tiers = tiers.map(function (tierId, index) {
			var tier = app.getTier(tierId);
			return (
				<Tier
					{...this.props}
					key={index}
					tier={tier}
					tierRank={6 - index}
				/>
			);
		}, this);

		return (
			<div className="tree">
				<div className="progressbar" data-percent={progressbarPercent}></div>
				{tiers}
			</div>
		);
	}
}

Tree.propTypes = {
	app: PropTypes.object.isRequired,
	handleSkillEvent: PropTypes.func.isRequired,
	tree: PropTypes.object.isRequired,
};

export default Tree;
