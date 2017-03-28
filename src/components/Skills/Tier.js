import React, { Component, PropTypes } from 'react';
import Skill from './Skill';

class Tier extends Component
{
  render() {
    const { tier, tierRank } = this.props;

    var currectUnlockRequire = tier.currectUnlockRequire;
    if (currectUnlockRequire < 10)
      currectUnlockRequire = '0' + currectUnlockRequire;

    return (
      <div className={this.getClassName()}>
        <div className="tier-skills">{this.renderSkills()}</div>
      </div>
    );
  }

  getClassName() {
    const { tree, tier } = this.props;

    var className = ['tier'];
    if (tier.unlocked) className.push('tier-unlocked');
    if (tree.reduced) className.push('tier-reduced');

    return className.join(' ');
  }

  renderSkills() {
    const { tier, getSkill } = this.props;
    return tier.skills.map(function (skillId, index) {
      var skill = getSkill(skillId);
      return (
        <Skill
          {...this.props}
          key={index}
          skill={skill}
        />
      );
    }, this)
  }
}

Tier.propTypes = {
  getSkill: PropTypes.func.isRequired,
  tree: PropTypes.object.isRequired,
  tier: PropTypes.object.isRequired,
  tierRank: PropTypes.number.isRequired,
};

export default Tier;
