import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/events';

import Perks from '../components/PerkDecks/Perks';
import PerkDecksSide from '../components/PerkDecks/PerkDecksSide';

class PerkDecks extends Component
{
    constructor(prop) {
        super(prop);
        this.reflowCanvas = this.reflowCanvas.bind(this);
    }

    reflowCanvas(canvas, datas) {
        const { hover, deck, isOwned } = datas;

        var color = (isOwned)? 'black' : 'normal';

        this.props.drawIcon(`deck_${deck.name}`, canvas, color);
    }

    render() {
        const { dispatch } = this.props;
        const { perks, activedPerk } = this.props;
        const { locale, localeText } = this.props;

        const app = {
            locale,
            localeText,
            reflowCanvas     : this.reflowCanvas,
            getPerk          : (id) => this.props.perks[id],
            getDeck          : (id) => this.props.decks[id],
            handlePerkClick  : (id) => {dispatch(actions.handlePerkClick(id))},
            handlePerkDouble : (id) => {dispatch(actions.handlePerkDouble(id))},
            handleDeckClick  : (id) => {dispatch(actions.handleDeckClick(id))},
            handleDeckEnter  : (id) => {dispatch(actions.handleDeckEnter(id))},
            handleDeckLeave  : (id) => {dispatch(actions.handleDeckLeave(id))}
        }

        var display = app.getDeck(this.props.display);

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
