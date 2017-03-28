import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class InfamySide extends Component
{
  render() {
    return (
      <div className="section-aside">{this.renderContent()}</div>
    );
  }

  renderContent() {
    if ( ! this.props.infamy) return;
    const { localeText, infamy } = this.props;

    return (
      <div className="infobox">
        <h1 className="infobox-header"
          dangerouslySetInnerHTML={{ __html: localeText(`menu_infamy_name_${infamy.name}`) }}
        />
        {this.pointsToUnlock()}
        <p className="infobox-block"
          dangerouslySetInnerHTML={{ __html: this.desc(infamy) }}
        />
        {this.disabled()}
      </div>
    );
  }

  desc() {
    const { localeText, infamy } = this.props;
    return localeText(`menu_infamy_desc_${infamy.name}`, infamy.datas || {});
  }

  pointsToUnlock() {
    const { localeText, infamy } = this.props;
    if (infamy.unlocked) return;

    return (
      <p className="infobox-block alerted" dangerouslySetInnerHTML={{
        __html: localeText('menu_infamy_unlock_prev_tier')
      }} />
    );
  }

  disabled() {
    const { localeText, infamy } = this.props;
    if ( ! infamy.disable) return;

    return (
      <div className="infobox-bottom">
        <p className="infobox-block alerted locked" dangerouslySetInnerHTML={{
          __html: localeText('bm_global_value_dlc')
        }} />
        <p className="infobox-block dlc-item" dangerouslySetInnerHTML={{
          __html: localeText('menu_l_global_value_dlc')
        }} />
      </div>
    );
  }
}

InfamySide.propTypes = {
  locale: PropTypes.func.isRequired,
  localeText: PropTypes.func.isRequired,
};

function select(state) {
    const { display, infamyList } = state.infamy;
  if (typeof display !== 'number') return {};

  state = {};
  state.infamy = infamyList[display];

  return state;
}

export default connect(select)(InfamySide)
