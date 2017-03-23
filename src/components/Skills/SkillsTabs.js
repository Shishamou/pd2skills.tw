import React, { Component, PropTypes } from 'react';

class SkillsTabs extends Component
{
  render() {
    return (
      <div className="section-tabs">
        <div className="section-tabs-main">
          <div className="section-tabs-contain">{this.renderTabs()}</div>
        </div>
      </div>
    );
  }

  renderTabs() {
    const { locale, masterTrees, activedTree, onClick } = this.props;

    return masterTrees.map((tree, index) =>
      <div key={index}
        className={(index === activedTree)? 'section-tab actived' : 'section-tab'}
        onClick={(e) => {onClick(index)}}
      >
        <span>{locale(`st_menu_${tree.name}`)}</span>
      </div>
    );
  }
}

SkillsTabs.propTypes = {
  locale: PropTypes.func.isRequired,
  masterTrees: PropTypes.array.isRequired,
  activedTree: PropTypes.number,
  onClick: PropTypes.func.isRequired,
};

export default SkillsTabs;
