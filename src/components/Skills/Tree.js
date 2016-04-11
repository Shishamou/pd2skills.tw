import React, { Component, PropTypes } from 'react';
import Tier from './Tier';

class Tree extends Component
{
	constructor(props) {
		super(props);
		this.handleRespec = this.handleRespec.bind(this);
	}

	handleRespec() {
		this.props.respecTree(this.props.tree.id);
	}

	render() {
		const { locale, localeText } = this.props;

		var available = locale('st_menu_available_skill_points', {
			points: this.props.availablePoints
		});

		var respec = locale('st_menu_respec_tree');

		return (
			<div className="tree">
				<div className="tree-control">
					<div className="tree-control-content">
						<p className="tree-control-available">{available}</p>
						<p className="tree-control-respec" onClick={this.handleRespec}>{respec}</p>
					</div>
				</div>
				<div className="progressbar" data-percent={this.getProgressbarPercent()} />
				{this.renderTiers()}
			</div>
		);
	}

	getProgressbarPercent() {
		const { tree, getTier } = this.props;
		var tiers = tree.tiers;

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
	}

	renderTiers() {
		const { tree, getTier } = this.props;

		var tiers = tree.tiers.slice().reverse();
		tiers = tiers.map(function (tierId, index) {
			var tier = getTier(tierId);
			return (
				<Tier
					{...this.props}
					key={index}
					tier={tier}
					tierRank={tiers.length - index - 1}
				/>
			);
		}, this);

		return tiers;
	}
}

Tree.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	getTier: PropTypes.func.isRequired,
	respecTree: PropTypes.func.isRequired,
	tree: PropTypes.object.isRequired,
	availablePoints: PropTypes.number.isRequired,
};

export default Tree;
