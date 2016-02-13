import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleSkillEvent, activeSkillTree } from '../actions/skills';
import Tree from '../components/Tree';

class App extends Component
{
    constructor(prop) {
        super(prop);
    }

    clickTab(index) {
        this.props.dispatch(activeSkillTree(index));
    }

    render() {
        const { dispatch, trees, tiers, skills } = this.props;

        const activedTree = this.props.activedTree || 0;
        const tree = trees[activedTree] || trees.slice().shift();
        const locale = (e) => (e);

        return (
            <div className="section sections-skill">
                <div className="section-main">
                    <ul className="section-tabs">
                        {trees.map((tree, index) => (
                            <li key={index}
                                className={(activedTree === index)? 'actived' : ''}
                                onClick={(e)=>{this.clickTab(index)}}
                            >{locale(tree.name)}</li>
                        ))}
                    </ul>
                    <div className="section-content">
                        {(tree)? (
                            <Tree tree={tree}
                                getTier={(id) => tiers[id]}
                                getSkill={(id) => skills[id]}
                                handleEvent={(id, event) => dispatch(handleSkillEvent(id, event))}
                            />
                        ) : ''}
                    </div>
                </div>
                <div className="section-aside">
                    <div className="infobox">
                        <div className="infobox-header">
                            <h1 className="infobox-title">解鎖技能樹</h1>
                            <h2 className="infobox-subtitle">Unlocking The Mastermind</h2>
                        </div>
                        <div className="infobox-block">
                            <p className="alerted">你必須再花費 [point] 點來解鎖第 [tier] 階技能</p>
                        </div>
                        <div className="infobox-block">
                            <p>基本: <span className="strong">[point] 點 / [cost]</span></p>
                            <p>你跑步的耐力增加<strong>100%</strong></p>
                        </div>
                        <div className="infobox-block">
                            <p>王牌: <span className="alerted">[point] 點 / [cost]</span></p>
                            <p>你和隊友的耐力增加<strong>50%</strong>。（你自己增加共<strong>150%</strong>）</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function select(state) {
    return {
        activedTree: state.activedTree,
        trees: state.trees,
        tiers: state.tiers,
        skills: state.skills
    };
}

export default connect(select)(App)
