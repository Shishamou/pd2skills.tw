import React, { Component, PropTypes } from 'react';
import * as statuses from '../../constants/InfamyStatuses';

class Infamy extends Component
{
  constructor(props) {
    super(props);
    this.handleInfamyClick = this.handleInfamyClick.bind(this);
    this.handleInfamyRemove = this.handleInfamyRemove.bind(this);
    this.handleInfamyEnter = this.handleInfamyEnter.bind(this);
    this.handleInfamyLeave = this.handleInfamyLeave.bind(this);

    this.hover = false;
  }

  componentDidMount() {
    const { reflowCanvas, infamy } = this.props;
    this.props.reflowCanvas(this.refs.canvas, {
      hover: this.hover,
      infamy
    });
  }

  componentDidUpdate() {
    const { reflowCanvas, infamy } = this.props;
    this.props.reflowCanvas(this.refs.canvas, {
      hover: this.hover,
      infamy
    });
  }

  handleInfamyClick(e) {
    this.props.handleInfamyClick(this.props.infamy.id);
  }

  handleInfamyRemove(e) {
    e.stopPropagation();
    this.props.handleInfamyRemove(this.props.infamy.id);
  }

  handleInfamyEnter(e) {
    this.hover = true;
    this.props.handleInfamyEnter(this.props.infamy.id);
  }

  handleInfamyLeave(e) {
    this.hover = false;
    this.props.handleInfamyLeave(this.props.infamy.id);
  }

  render() {
    return (
      <div className={this.className()}
        onClick={this.handleInfamyClick}
        onMouseEnter={this.handleInfamyEnter}
        onMouseLeave={this.handleInfamyLeave}
      >
        <div className="infamy-line">
          <div className="infamy-line-top" />
          <div className="infamy-line-left" />
          <div className="infamy-line-right" />
          <div className="infamy-line-bottom" />
        </div>
        <div className="infamy-icon">
          <canvas ref="canvas"/>
        </div>
        <p className="infamy-text">{this.text()}</p>
        <div className="infamy-remove" onClick={(e) => this.handleInfamyRemove(e)} />
      </div>
    );
  }

  className() {
    const { infamy } = this.props;
    var className = ['infamy'];

    if (infamy.disable)
      className.push('status-disabled');
    if (infamy.owned)
      className.push('status-owned');
    else if (infamy.unlocked)
      className.push('status-unlocked');

    return className.join(' ');
  }

  text() {
    const { infamy } = this.props;
    const { locale, localeText } = this.props;

    switch (infamy.status) {
      case statuses.STATUS_OWNED:
        return locale('st_menu_skill_owned');
      case statuses.STATUS_UNLOCKED:
        return locale('st_menu_point', {points: 1});
      case statuses.STATUS_DISABLE:
      case statuses.STATUS_LOCKED:
      default:
        return locale('st_menu_skill_locked');
    }
  }
}

Infamy.propTypes = {
  locale: PropTypes.func.isRequired,
  localeText: PropTypes.func.isRequired,
  infamy: PropTypes.object.isRequired,
  handleInfamyClick: PropTypes.func.isRequired,
  handleInfamyRemove: PropTypes.func.isRequired,
  handleInfamyEnter: PropTypes.func.isRequired,
  handleInfamyLeave: PropTypes.func.isRequired,
  reflowCanvas: PropTypes.func.isRequired,
};

export default Infamy;
