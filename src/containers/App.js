import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleSkillEvent } from '../actions/skills';
import Tree from '../components/Tree';

class App extends Component
{
    render() {
        const { dispatch, trees, tiers, skills } = this.props;

        return (
            <div className="trees">
                {trees.map((tree, index) =>
                    <Tree
                        key={index}
                        id={index}
                        tree={tree}
                        getTier={(id) => tiers[id]}
                        getSkill={(id) => skills[id]}
                        handleEvent={(id, event) => dispatch(handleSkillEvent(id, event))}
                    />
                )}
            </div>
        )
    }
}

function select(state) {
    return {
        trees: state.trees,
        tiers: state.tiers,
        skills: state.skills,
    };
}

export default connect(select)(App)
