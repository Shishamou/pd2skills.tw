import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/skills';

import TreeTabs from '../components/TreeTabs';
import Tree from '../components/Tree';
import Infobox from '../components/Infobox';

class Skills extends Component
{
    constructor(prop) {
        super(prop);
        this.getTree = this.getTree.bind(this);
        this.getTier = this.getTier.bind(this);
        this.getSkill = this.getSkill.bind(this);
    }

    getTree(id) {
        return this.props.trees[id];
    }

    getTier(id) {
        return this.props.tiers[id];
    }

    getSkill(id) {
        return this.props.skills[id];
    }

    render() {
        const { dispatch } = this.props;
        const { trees, currectTree, availablePoints } = this.props;
        const { locale, localeText } = this.props;

        const app = {
            locale,
            localeText,
            getTree: this.getTree,
            getTier: this.getTier,
            getSkill: this.getSkill,
            respecTree        : (id) => {dispatch(actions.respecSkillTree(id))},
            handleSkillClick  : (id) => {dispatch(actions.handleSkillClick(id))},
            handleSkillRemove : (id) => {dispatch(actions.handleSkillRemove(id))},
            handleSkillEnter  : (id) => {dispatch(actions.handleSkillEnter(id))},
            handleSkillLeave  : (id) => {dispatch(actions.handleSkillLeave(id))},
        }

        return (
            <div className="section sections-skill">
                <div className="section-main">
                    <TreeTabs {...app}
                        trees={trees}
                        currectTree={currectTree}
                        onClick={(e) => {dispatch(actions.activeSkillTree(e))}}
                    />
                    <div className="section-content">
                        {(currectTree) &&
                            <Tree {...app}
                                tree={currectTree}
                                available={availablePoints}
                            />
                        }
                    </div>
                </div>
                <div className="section-aside">
                    <Infobox app={app} display={this.props.displayInformation} />
                </div>
            </div>
        )
    }
}

Skills.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
};

function select(state) {
    state = state.skills;
    var currectTree = state.trees[state.activedTree] || null;
    state = Object.assign({ currectTree }, state);
    return state
}

export default connect(select)(Skills)
