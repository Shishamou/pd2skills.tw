import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/app';

import Localisation from '../public/Localisation';
import Skills from './Skills';
import Infamy from './Infamy';

class App extends Component
{
    constructor(prop) {
        super(prop);
        this.locale = this.locale.bind(this);
        this.localeText = this.localeText.bind(this);
    }

    componentWillMount() {
        const { dispatch } = this.props;
    }

    locale(key, injects = {}) {
        var text = Localisation.localize(key);
        text = text.replace(/\$(\w+);?/g, (match, key)=>(
            (typeof injects[key] !== 'undefined') ? injects[key] : match)
        );
        return text;
    }

    localeText(key, injects) {
        var text = this.locale(key, injects);
        if (text == '') return text;

        text = text.replace(/{{(\w+)}}/g, (match, key)=>(this.locale(key) || match));
        text = text.replace(/##(.+?)##/g, (match, key)=>(`<strong>${key}</strong>`));
        text = text.replace(/\n/g, '<br />');
        return text;
    }

    switchTab(name) {
        this.props.dispatch(actions.switchMainTab(name));
    }

    render() {
        const { locale, localeText } = this;

        const tabs = ['skills', 'perk decks', 'infamy'];
        const display = this.props.display || tabs[0];

        const main = ((display) => {
            switch (display) {
                case 'skills':
                    return <Skills locale={this.locale} localeText={this.localeText} />;
                case 'infamys':
                    return <Infamy locale={this.locale} localeText={this.localeText} />;
                default:
            }
        })(display);

        return (
            <div className="wrapper">
                <div className="header">
                    <ul className="header-nav">
                        {tabs.map((tab, index) =>
                            <li key={index}
                                className={(tab === display)? 'actived' : ''}
                                onClick={(e)=>{this.switchTab(tab)}}
                            >
                                <span>{tab}</span>
                            </li>
                        )}
                    </ul>
                </div>
                {main}
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
