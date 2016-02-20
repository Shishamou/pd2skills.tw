import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Localisation from '../public/Localisation';
import Skills from './Skills';

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

    render() {
        const { locale, localeText } = this;

        return (
            <div className="wrapper">
                <div className="header">
                    <ul className="header-nav">
                        <li className="actived">skills</li>
                        <li>perk decks</li>
                        <li>infamys</li>
                    </ul>
                </div>
                <Skills locale={this.locale} localeText={this.localeText} />
            </div>
        );
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
