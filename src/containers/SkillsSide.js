import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class SkillsSide extends Component
{
  render() {
    return (
      <div className="section-aside">{this.renderContent()}</div>
    );
  }

  renderContent() {
    if ( ! this.props.skill) return;
    const { localeText, skill } = this.props;

    return (
      <div className="infobox">
        <h1 className="infobox-header"
          dangerouslySetInnerHTML={{ __html: localeText(`menu_${skill.name}`) }}
        />
        {this.pointsToUnlockTier()}
        {this.skillRequired()}
        <p className="infobox-block"
          dangerouslySetInnerHTML={{ __html: this.desc() }}
        />
      </div>
    );
  }

  pointsToUnlockTier() {
    if ( ! this.props.tierNeeded) return '';
    const { localeText, tier } = this.props;

    var needed = this.props.tierNeeded;
    var local = (needed == 1)
      ? 'st_menu_points_to_unlock_tier_singular'
      : 'st_menu_points_to_unlock_tier';

    return (
      <p className="infobox-block alerted" dangerouslySetInnerHTML={{
        __html: localeText(local, {
          points: needed,
          tier: tier.tier
        })
      }} />
    );
  }

  skillRequired() {
    if ( ! this.props.requiredSkill) return '';
    const { locale } = this.props;
    const { requiredSkill } = this.props;

    return (
      <p className="infobox-block alerted" dangerouslySetInnerHTML={{
        __html: locale('st_menu_prerequisite_following_skill')
          + locale(`menu_${requiredSkill.name}`)
      }} />
    );
  }

  desc() {
    const { locale, localeText, skill, tier } = this.props;

    const handleCostText = (cost) => locale('st_menu_cost', { cost });
    const handlePointsText = (points) => locale(
      (points > 0) ? 'st_menu_point_plural' : 'st_menu_point', { points }
    );

    var basic, pro;

    if (skill.ownedBasic) {
      basic = locale('st_menu_skill_owned');
    } else {
      basic = handlePointsText(tier.skillPointBasic) + ' / ' + handleCostText(tier.skillCostBasic);
      basic = (skill.unlockedBasic)? basic : `<span class="alerted">${basic}</span>`;
    }

    if (skill.ownedAce) {
      pro = locale('st_menu_skill_owned');
    } else {
      pro = handlePointsText(tier.skillPointAce) + ' / ' + handleCostText(tier.skillCostAce);
      pro = (skill.unlockedAce)? pro : `<span class="alerted">${pro}</span>`;
    }

    var datas = skill.datas || {};
    return localeText(`menu_${skill.name}_desc`, Object.assign(datas, { basic, pro }));
  }
}

SkillsSide.propTypes = {
  locale: PropTypes.func.isRequired,
  localeText: PropTypes.func.isRequired,
};

function select(state) {
    const { display, skills, tiers } = state.skills;
  if (typeof display !== 'number') return {};

  var skill = skills[display];
  var tier = tiers[skill.tierId];

  state = {};
  state.skill = skill;
  state.tier = tier;

  if ( ! tier.unlocked) {
    state.tierNeeded = (0 - tier.currectUnlockNeeded);
  }

  if ( ! skill.requiredUnlocked) {
    state.requiredSkill = (function(requiredSkill) {
      for (var i = 0; i < skills.length; i++)
        if (skills[i].name === requiredSkill)
          return skills[i];
    })(skill.requiredSkill);
  }

  return state;
}

export default connect(select)(SkillsSide)
