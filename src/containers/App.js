import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Localisation from '../public/Localisation';
import { handleSkillEvent, activeSkillTree } from '../actions/skills';

import Tree from '../components/Tree';
import Infobox from '../components/Infobox';

Localisation.setLocale('tc');

class App extends Component
{
    constructor(prop) {
        super(prop);
    }

    clickTab(index) {
        this.props.dispatch(activeSkillTree(index));
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

    render() {
        const { dispatch, trees, tiers, skills } = this.props;

        const activedTree = this.props.activedTree || 0;
        const tree = trees[activedTree] || trees.slice().shift();

        const locale = this.locale;
        const localeText = this.localeText.bind(this);

        const app = {
            getTree: (id) => trees[id],
            getTier: (id) => tiers[id],
            getSkill: (id) => skills[id],
            locale: this.locale.bind(this),
            localeText: this.localeText.bind(this)
        }

        return (
            <div className="section sections-skill">
                <div className="section-main">
                    <ul className="section-tabs">
                        {trees.map((tree, index) => (
                            <li key={index}
                                className={(activedTree === index)? 'actived' : ''}
                                onClick={(e)=>{this.clickTab(index)}}
                            >{locale(`st_menu_${tree.name}`)}</li>
                        ))}
                    </ul>
                    <div className="section-content">
                        {(tree)? (
                            <Tree tree={tree}
                                locale={locale}
                                getTier={(id) => tiers[id]}
                                getSkill={(id) => skills[id]}
                                handleEvent={(id, event) => dispatch(handleSkillEvent(id, event))}
                            />
                        ) : ''}
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
    return {
        displayInformation: state.displayInformation,
        activedTree: state.activedTree,
        trees: state.trees,
        tiers: state.tiers,
        skills: state.skills,
    };
}

export default connect(select)(App)
