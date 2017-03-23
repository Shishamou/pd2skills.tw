import React, { Component, PropTypes } from 'react';
import Tier from './Tier';

class Subtree extends Component
{
  render() {
    const { locale, tree } = this.props;

    return (
      <div className="subtree">
        <div className="subtree-header">{locale(`st_menu_${tree.name}`)}</div>
        <div className="subtree-tiers">{this.renderTiers()}</div>
        <div className="subtree-footer">{tree.spendPoints}</div>
      </div>
    );
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

Subtree.propTypes = {
  getTier: PropTypes.func.isRequired,
  tree: PropTypes.object.isRequired,
};

export default Subtree;
