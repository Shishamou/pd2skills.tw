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
    const { locale } = this;

    const tabs = [
      locale('menu_st_skilltree'),
      locale('menu_specialization'),
      locale('menu_infamytree'),
    ];

    const display = this.props.display || 0;

    return (
      <div>
        <div className="header">
          <ul className="header-nav">
            {tabs.map((tab, index) =>
              <li key={index}
                className={(index === display)? 'actived' : ''}
                onClick={(e)=>{this.switchTab(index)}}
              >
                <span>{tab}</span>
              </li>
            )}
          </ul>
        </div>
        {this.renderMain(display)}
      </div>
    );
  }

  renderMain(display) {
    const { locale, localeText, drawIcon } = this;
    const func = {
      locale, localeText, drawIcon
    };

    switch (display) {
      case 2:
        return <Infamy {...func} />;
      case 1:
        return <PerkDecks {...func} />;
      case 0:
      default:
        return <Skills {...func} />;
    }
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
