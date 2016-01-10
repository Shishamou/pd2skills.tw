import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { handleSkillEvent } from '../actions/skills';
import Skill from '../components/Skill';

class App extends Component
{
    render() {
        const { dispatch, skills } = this.props;

        return (
            <div className="tier">
                {skills.map((skill, index) =>
                    <Skill
                        id={index}
                        key={index}
                        name={skill.name}
                        status={skill.status}
                        handleEvent={(id, event) => dispatch(handleSkillEvent(id, event))}
                    />
                )}
            </div>
        )
    }
}

function select(state) {
    return state;
}

export default connect(select)(App)
