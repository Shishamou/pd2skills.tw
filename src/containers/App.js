import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// import Skills from './Skills';

class App extends Component
{
    constructor(prop) {
        super(prop);
    }

    componentWillMount() {
        const { dispatch } = this.props;
    }

    render() {
        return (
            <div className="wrapper">
                <div className="header">
                    <ul className="header-nav">
                        <li className="actived">skills</li>
                        <li>perk decks</li>
                    </ul>
                </div>
            </div>
        );
    }
}
// <Skills />

function select(state) {
    return state;
}

export default connect(select)(App);
