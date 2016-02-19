import React, { Component, PropTypes } from 'react';
import Tier from './Tier';

class Tree extends Component
{
	constructor(props) {
		super(props);
		this.getProgressbarPercent = this.getProgressbarPercent.bind(this);
	}

	getProgressbarPercent(tiers) {
		const { app } = this.props;

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
	}

	render() {
		const { app, tree } = this.props;
		const { locale, localeText } = app;

		var tiers = tree.tiers.slice().reverse();
		tiers = tiers.map(function (tierId, index) {
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

		var progressbarPercent = this.getProgressbarPercent(tree.tiers);
		var available = locale('st_menu_available_skill_points', {
			points: this.props.available
		});

		return (
			<div className="tree">
				<div className="tree-control">
					<p className="tree-control-available">{available}</p>
					<p className="tree-control-respec">{locale('st_menu_respec_tree')}</p>
				</div>
				<div className="progressbar" data-percent={progressbarPercent} />
				{tiers}
			</div>
		);
	}
}

Tree.propTypes = {
	app: PropTypes.object.isRequired,
	handleSkillEvent: PropTypes.func.isRequired,
	tree: PropTypes.object.isRequired,
	available: PropTypes.number.isRequired,
};

export default Tree;
