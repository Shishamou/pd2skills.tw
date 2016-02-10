import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleSkillEvent, activeSkillTree } from '../actions/skills';
import Tree from '../components/Tree';

class App extends Component
{
    render() {
        const { dispatch, trees, tiers, skills, activedTree } = this.props;

        const tree = trees[activedTree];

        return (
            <div className="simulator simulator-skills">
                <div className="simulator-main">
                    <ul className="simulator-tabs">
                        {trees.map((tree, index) => (
                            <li key={index} onClick={(e) => dispatch(activeSkillTree(index))}>
                                {(activedTree !== index)
                                    ? <span>{tree.name}</span>
                                    : <strong>{tree.name}</strong>
                                }
                            </li>
                        ))}
                    </ul>
                    <div className="simulator-content">
                        {(tree)? (
                            <Tree tree={tree}
                                getTier={(id) => tiers[id]}
                                getSkill={(id) => skills[id]}
                                handleEvent={(id, event) => dispatch(handleSkillEvent(id, event))}
                            />
                        ) : ''}
                    </div>
                </div>
                <div className="simulator-aside">
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
