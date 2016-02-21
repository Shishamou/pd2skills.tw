import React, { Component, PropTypes } from 'react';

import Infamy from './Infamy';

class InfamyTree extends Component
{
	render() {
		const { table, getInfamy } = this.props;

		return (
			<div className="infamytree">
				{table.map((row, key) =>
					<div className="infamytree-row" key={key}>
						{row.map((infamy, key) =>
							<Infamy {...this.props} infamy={getInfamy(infamy)} key={key} />
						)}
					</div>
				)}
			</div>
		);
	}
}

InfamyTree.propTypes = {
	getInfamy: PropTypes.func.isRequired,
	table: PropTypes.array.isRequired,
};

export default InfamyTree;
