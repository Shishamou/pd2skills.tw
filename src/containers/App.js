import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/app';

import Localisation from '../public/Localisation';
import IconDrawer from '../facades/IconDrawer';

import Skills from './Skills';
import PerkDecks from './PerkDecks';
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

    render() {
        const { locale, localeText, drawIcon } = this;

        const tabs = ['skills', 'perk decks', 'infamy'];
        const display = this.props.display || tabs[0];

        const func = {
            locale, localeText, drawIcon
        };

        const main = ((display) => {
            switch (display) {
                case 'skills':
                    return <Skills {...func} />;
                case 'perk decks':
                    return <PerkDecks {...func} />;
                case 'infamy':
                    return <Infamy {...func} />;
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

    locale(key, injects = {}) {
        var text = Localisation.localize(key);
        text = text.replace(/\$(\w+);?/g, (match, key) =>
            (typeof injects[key] !== 'undefined') ? injects[key] : match
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

    drawIcon(name, canvas, color) {
        try {
            IconDrawer.draw(name, canvas, color);
            canvas.dataset.icon = name;
            canvas.dataset.color = color;
        } catch (e) {
            console.log(e);
        }
    }

    switchTab(name) {
        this.props.dispatch(actions.switchMainTab(name));
    }
}

function select(state) {
    return state;
}

export default connect(select)(App);
