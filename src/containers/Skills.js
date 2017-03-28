import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/skills';

import SkillsTabs from '../components/Skills/SkillsTabs';
import SkillsMain from '../components/Skills/SkillsMain';
import SkillsSide from './SkillsSide';

class Skills extends Component
{
  constructor(prop) {
    super(prop);
    this.reflowCanvas = this.reflowCanvas.bind(this);
  }

  reflowCanvas(canvas, datas) {
    const { skill, tier, hover } = datas;

    var color = (function(skill, tier) {
      if (skill.alerted)
        return 'alert';
      if (skill.ownedBasic || skill.ownedAce || hover)
        return 'normal';
      if (tier.unlocked)
        return 'gray';
      return 'gray';
      // return 'dark';
    })(skill, tier);

    var icon = skill.icon || skill.name
    this.props.drawIcon(`skill_${icon}`, canvas, color);
  }

  render() {
    const { dispatch } = this.props;
    const { trees, currectTree, availablePoints, display } = this.props;
    const { locale, localeText } = this.props;

    const app = {
      reflowCanvas      : this.reflowCanvas,
      getTree           : (id) => this.props.trees[id],
      getTier           : (id) => this.props.tiers[id],
      getSkill          : (id) => this.props.skills[id],
      respecTree        : (id) => {dispatch(actions.respecSkillTree(id))},
      handleSkillClick  : (id) => {dispatch(actions.handleSkillClick(id))},
      handleSkillRemove : (id) => {dispatch(actions.handleSkillRemove(id))},
      handleSkillEnter  : (id) => {dispatch(actions.handleSkillEnter(id))},
      handleSkillLeave  : (id) => {dispatch(actions.handleSkillLeave(id))},
    }

    return (
      <div className="section sections-skill">
        <SkillsTabs {...this.props} onClick={(e) => {dispatch(actions.activeSkillTree(e))}} />
        <SkillsMain {...this.props} {...app} />
        <SkillsSide {...this.props} />
      </div>
    )
  }
}

Skills.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	drawIcon: PropTypes.func.isRequired,
};

function select(state) {
  state = state.skills;
  var currectTree = state.masterTrees[state.activedTree] || null;
  return Object.assign({ currectTree }, state);
}

export default connect(select)(Skills)
