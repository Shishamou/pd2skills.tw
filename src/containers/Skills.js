import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { handleSkillEvent, activeSkillTree } from '../actions/skills';
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
        this.clickTab = this.clickTab.bind(this);
        this.handleSkillEvent = this.handleSkillEvent.bind(this);
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

    clickTab(index) {
        this.props.dispatch(activeSkillTree(index));
    }

    handleSkillEvent(id, event) {
        this.props.dispatch(handleSkillEvent(id, event));
    }

    render() {
        const { dispatch } = this.props;
        const { trees, currectTree } = this.props;
        const { locale, localeText } = this.props;

        const app = {
            locale,
            localeText,
            getTree: this.getTree,
            getTier: this.getTier,
            getSkill: this.getSkill
        }

        return (
            <div className="section sections-skill">
                <div className="section-main">
                    <TreeTabs
                        app={app}
                        trees={trees}
                        currectTree={currectTree}
                        onClick={this.clickTab}
                    />
                    <div className="section-content">
                        {(currectTree) &&
                            <Tree app={app}
                                handleSkillEvent={this.handleSkillEvent}
                                tree={currectTree}
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
