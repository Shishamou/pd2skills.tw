import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/perks';

import PerkDecksTabs from '../components/PerkDecks/PerkDecksTabs';
import PerkDecksMain from '../components/PerkDecks/PerkDecksMain';
import PerkDecksSide from '../components/PerkDecks/PerkDecksSide';

class PerkDecks extends Component
{
    constructor(props) {
        super(props);
        this.reflowCanvas = this.reflowCanvas.bind(this);
    }

    reflowCanvas(canvas, datas) {
        const { hover, deck, isOwned } = datas;

        var color = (isOwned)? 'black' : 'normal';
        var name = deck.icon || deck.name;
        this.props.drawIcon(`deck_${name}`, canvas, color);
    }

    render() {
        const { dispatch } = this.props;

        const app = {
            reflowCanvas     : this.reflowCanvas,
            getPerk          : (id) => this.props.perks[id],
            getDeck          : (id) => this.props.decks[id],
            respecPerks      : (id) => {dispatch(actions.respecPerk(id))},
            handlePerkClick  : (id) => {dispatch(actions.handlePerkClick(id))},
            handlePerkDouble : (id) => {dispatch(actions.handlePerkDouble(id))},
            handlePerkRemove : (id) => {dispatch(actions.handlePerkRemove(id))},
            handleDeckClick  : (id) => {dispatch(actions.handleDeckClick(id))},
            handleDeckEnter  : (id) => {dispatch(actions.handleDeckEnter(id))},
            handleDeckLeave  : (id) => {dispatch(actions.handleDeckLeave(id))}
        }

        var display = app.getDeck(this.props.display);

        return (
            <div className="section sections-perks">
                <PerkDecksTabs {...this.props} onClick={(e) => dispatch(actions.switchPerks(e))} />
                <PerkDecksMain {...this.props} {...app} />
                <PerkDecksSide {...this.props} display={display} />
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
