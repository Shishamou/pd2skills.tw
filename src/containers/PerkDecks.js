import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/events';

import Perks from '../components/Perks';
import PerkDecksSide from '../components/PerkDecksSide';

class PerkDecks extends Component
{
    constructor(prop) {
        super(prop);
        this.getPerk = this.getPerk.bind(this);
        this.getDeck = this.getDeck.bind(this);
    }

    getPerk(id) {
        return this.props.perks[id];
    }

    getDeck(id) {
        return this.props.decks[id];
    }

    render() {
        const { dispatch } = this.props;
        const { perks, activedPerk } = this.props;
        const { locale, localeText } = this.props;

        const app = {
            locale,
            localeText,
            getPerk : this.getPerk,
            getDeck : this.getDeck,
            handlePerkClick : (id) => {dispatch(actions.handlePerkClick(id))},
            handlePerkDouble : (id) => {dispatch(actions.handlePerkDouble(id))},
            handleDeckClick : (id) => {dispatch(actions.handleDeckClick(id))},
            handleDeckEnter : (id) => {dispatch(actions.handleDeckEnter(id))},
            handleDeckLeave : (id) => {dispatch(actions.handleDeckLeave(id))}
        }

        var display = this.getDeck(this.props.display);

        return (
            <div className="section sections-perks">
                <div className="section-main">
                    <div className="section-content">
                        <Perks {...app} perks={perks} activedPerk={activedPerk} />
                    </div>
                </div>
                <PerkDecksSide {...app} display={display} />
            </div>
        )
    }
}

PerkDecks.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
};

function select(state) {
    return state.perks || {};
}

export default connect(select)(PerkDecks)
