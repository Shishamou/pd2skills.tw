import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleSkillEvent } from '../actions/skills';
import Trees from '../components/Trees';

class App extends Component
{
    render() {
        const { dispatch, trees, tiers, skills } = this.props;

        return (
            <Trees
                trees={trees}
                getTier={(id) => tiers[id]}
                getSkill={(id) => skills[id]}
                handleEvent={(id, event) => dispatch(handleSkillEvent(id, event))}
            />
        )
    }
}

function select(state) {
    return {
        trees: state.trees,
        tiers: state.tiers,
        skills: state.skills
    };
}

export default connect(select)(App)
