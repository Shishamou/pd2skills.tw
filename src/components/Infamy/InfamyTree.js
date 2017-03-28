import React, { Component, PropTypes } from 'react';

import Infamy from './Infamy';

class InfamyTree extends Component
{
  render() {
    const { table, getInfamy } = this.props;
    const { locale, localeText } = this.props;

    var available = locale('st_menu_infamy_available_points', { points: this.props.available });

    return (
      <div className="infamytree">
        <div className="infamytree-rows">
          {table.map((row, key) =>
            <div className="infamytree-row" key={key}>
              {row.map((infamy, key) =>
                <Infamy {...this.props} infamy={getInfamy(infamy)} key={key} />
              )}
            </div>
          )}
        </div>
        <div className="infamytree-control">
                    <p className="infamytree-control-available">{available}</p>
                </div>
      </div>
    );
  }
}

InfamyTree.propTypes = {
  locale: PropTypes.func.isRequired,
  localeText: PropTypes.func.isRequired,
  getInfamy: PropTypes.func.isRequired,
  table: PropTypes.array.isRequired,
  available: PropTypes.number.isRequired,
};

export default InfamyTree;
