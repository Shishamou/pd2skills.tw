import React, { Component, PropTypes } from 'react';

class PerkDecksSide extends Component
{
  render() {
    return (
      <div className="section-aside">{this.renderContent()}</div>
    );
  }

  renderContent() {
    const { locale, localeText } = this.props;

    const deck = this.props.display;
    if ( ! deck) return;

    return (
      <div className="infobox">
        <h1 className="infobox-header" dangerouslySetInnerHTML={{
          __html: localeText(`menu_${deck.name}`)
        }} />
        <p className="infobox-block" dangerouslySetInnerHTML={{
          __html: this.desc(deck)
        }} />
      </div>
    );
  }

  desc(deck) {
    return this.props.localeText(`menu_${deck.name}_desc`, deck.datas || {});
  }
}

PerkDecksSide.propTypes = {
  locale: PropTypes.func.isRequired,
  localeText: PropTypes.func.isRequired,
  display: PropTypes.object,
};

export default PerkDecksSide;
