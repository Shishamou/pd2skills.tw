import React, { Component, PropTypes } from 'react';

import Tree from './Tree';

class SkillsMain extends Component
{
	render() {
		const { currectTree } = this.props;

		return (
			<div className="section-main">
				<div className="section-content">
					{(currectTree) &&
						<Tree {...this.props} tree={currectTree} />
					}
				</div>
			</div>
		);
	}
}

SkillsMain.propTypes = {
	currectTree: PropTypes.object
};

export default SkillsMain;
