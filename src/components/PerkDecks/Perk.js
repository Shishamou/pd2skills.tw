import React, { Component, PropTypes } from 'react';

import Deck from './Deck';

class Perk extends Component
{
  render() {
    const { perk, getDeck } = this.props;
    const { handlePerkClick, handlePerkDouble, handlePerkRemove } = this.props;

    return (
      <div
        className={this.getClassName()}
        onClick={(e) => handlePerkClick(perk.id)}
        onDoubleClick={(e) => handlePerkDouble(perk.id)}
      >
        <div className="perk-header">{this.getHeader()}</div>
        <div className="decks">
          {perk.decks.map((deck, tier) =>
            <Deck
              {...this.props}
              key={tier}
              deck={getDeck(deck)}
              isOwned={(perk.tier > tier)}
            />
          )}
        </div>
        <div className="perk-remove" onClick={(e) => handlePerkRemove(perk.id)} />
      </div>
    );
  }

  getHeader() {
    const { locale, localeText, perk } = this.props;

    var header = locale(`menu_st_spec_${perk.name}`);
    return (perk.equipped)
      ? localeText('menu_st_active_spec', {specialization: header})
      : header;
  }

  getClassName() {
    const { perk, actived } = this.props;

    var className = ['perk'];
    if (perk.equipped) className.push('equipped');
    if (actived) className.push('actived');

    return className.join(' ');
  }
}

Perk.propTypes = {
  locale: PropTypes.func.isRequired,
  localeText: PropTypes.func.isRequired,
  handlePerkClick: PropTypes.func.isRequired,
  handlePerkDouble: PropTypes.func.isRequired,
  handlePerkRemove: PropTypes.func.isRequired,
  getDeck: PropTypes.func.isRequired,
  perk: PropTypes.object.isRequired,
  actived: PropTypes.bool,
};

export default Perk;
