import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Localisation from '../public/Localisation';
import { handleSkillEvent, activeSkillTree } from '../actions/skills';

import TreeTabs from '../components/TreeTabs';
import Tree from '../components/Tree';
import Infobox from '../components/Infobox';

class Skills extends Component
{
    constructor(prop) {
        super(prop);
        this.locale = this.locale.bind(this);
        this.localeText = this.localeText.bind(this);
        this.clickTab = this.clickTab.bind(this);
        this.handleSkillEvent = this.handleSkillEvent.bind(this);
    }

    locale(key) {
        return Localisation.localize(key);
    }

    localeText(key, injects = {}) {
        var text = this.locale(key);
        if (text == '') return text;

        text = text.replace(/{{(\w+)}}/g, (match, key)=>(this.locale(key) || match));
        text = text.replace(/\$(\w+);?/g, (match, key)=>(injects[key] || match));
        text = text.replace(/##(.+?)##/g, (match, key)=>(`<strong>${key}</strong>`));
        text = text.replace(/\n/g, '<br />');
        return text;
    }

    clickTab(index) {
        this.props.dispatch(activeSkillTree(index));
    }

    handleSkillEvent(id, event) {
        this.props.dispatch(handleSkillEvent(id, event));
    }

    render() {
        const { dispatch } = this.props;
        const { trees, tiers, skills } = this.props;
        const { currectTree } = this.props;

        const app = {
            getTree: (id) => trees[id],
            getTier: (id) => tiers[id],
            getSkill: (id) => skills[id],
            locale: this.locale,
            localeText: this.localeText
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

function select(state) {
    state = state.skills;
    var currectTree = state.trees[state.activedTree] || null;
    state = Object.assign({ currectTree }, state);
    return state
}

export default connect(select)(Skills)
