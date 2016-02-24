import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/events';

import Perks from '../components/Perks';

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
        const { perks, availablePoints } = this.props;
        const { locale, localeText } = this.props;

        const app = {
            locale,
            localeText,
            getPerk: this.getPerk,
            getDeck: this.getDeck,
            handleInfamyLeave  : (id) => {dispatch(actions.handleInfamyLeave(id))},
        }

        // var display = this.getPerk(this.props.display);
        var display = '';

        return (
            <div className="section sections-perks">
                <div className="section-main">
                    <div className="section-content">
                        <Perks {...app} perks={perks} />
                    </div>
                </div>
                <div {...app} display={display} />
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
