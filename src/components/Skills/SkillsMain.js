import React, { Component, PropTypes } from 'react';

import Tree from './Tree';

class SkillsMain extends Component
{
  constructor(props) {
    super(props);
    this.handleRespec = this.handleRespec.bind(this);
  }

  handleRespec() {
    // this.props.respecTree(this.props.tree.id);
    this.props.respecTree();
  }

  render() {
    return (
      <div className="section-main">
        <div className="section-content">
          {this.renderTree()}
          {this.renderControlBar()}
        </div>
      </div>
    );
  }

  renderTree() {
    const { currectTree } = this.props;

    return (currectTree)
      ? <Tree {...this.props} tree={currectTree} />
      : <div />;
  }

  renderControlBar() {
    const { locale } = this.props;

    var available = locale('st_menu_available_skill_points', {
      points: this.props.availablePoints
    });

    var respec = locale('st_menu_respec_all_trees');

    return (
      <div className="control tree-control">
        <div className="control-content">
          <p className="control-text">{available}</p>
          <p className="control-button" onClick={this.handleRespec}>{respec}</p>
        </div>
      </div>
    );
  }
}

SkillsMain.propTypes = {
  currectTree: PropTypes.object,
  availablePoints: PropTypes.number.isRequired,
  respecTree: PropTypes.func.isRequired,
};

export default SkillsMain;
