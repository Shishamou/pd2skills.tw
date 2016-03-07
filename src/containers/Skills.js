import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/skills';

import TreeTabs from '../components/Skills/TreeTabs';
import Tree from '../components/Skills/Tree';
import SkillsSide from '../components/Skills/SkillsSide';

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
            if (skill.ownedBasic || skill.ownedAce)
                return 'normal';
            if (tier.unlocked)
                return 'gray';
            return 'dark';
        })(skill, tier);

        this.props.drawIcon(`skill_${skill.name}`, canvas, color);
    }

    render() {
        const { dispatch } = this.props;
        const { trees, currectTree, availablePoints } = this.props;
        const { locale, localeText } = this.props;

        const app = {
            locale,
            localeText,
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
                <TreeTabs {...app}
                    trees={trees}
                    currectTree={currectTree}
                    onClick={(e) => {dispatch(actions.activeSkillTree(e))}}
                />
                <div className="section-main">
                    <div className="section-content">
                        {(currectTree) &&
                            <Tree {...app}
                                tree={currectTree}
                                available={availablePoints}
                            />
                        }
                    </div>
                </div>
                <SkillsSide {...app} display={this.props.display} />
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
    var currectTree = state.trees[state.activedTree] || null;
    state = Object.assign({ currectTree }, state);
    return state
}

export default connect(select)(Skills)
