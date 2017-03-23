import React, { Component, PropTypes } from 'react';

import Perks from './Perks';

class PerkDecksMain extends Component
{
  constructor(props) {
    super(props);
    this.handleRespec = this.handleRespec.bind(this);
  }

  handleRespec() {
    this.props.respecPerks();
  }

  render() {
    const { locale } = this.props;

    var respec = locale('menu_st_respec_spec_points');

    return (
      <div className="section-main">
        <div className="section-content">
          <Perks {...this.props} />
          <div className="control perks-control">
            <div className="control-content">
              <p className="control-text" id="perk_points">{this.renderTotalPoints()}</p>
              <p className="control-button" onClick={this.handleRespec}>{respec}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderTotalPoints() {
    const { locale, localeText, spentPoints } = this.props;

    return locale('menu_st_spent_xp_perk_total') + spentPoints;
  }
}

PerkDecksMain.propTypes = {
  locale: PropTypes.func.isRequired,
  localeText: PropTypes.func.isRequired,
  respecPerks: PropTypes.func.isRequired,
  spentPoints: PropTypes.number.isRequired,
};

export default PerkDecksMain;
