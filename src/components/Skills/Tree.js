import React, { Component, PropTypes } from 'react';
import Subtree from './Subtree';

class Tree extends Component
{
	render() {
		const { locale, localeText } = this.props;

		return (
			<div className="tree">
				<div className="subtrees">
					{this.renderSubtrees()}
				</div>
			</div>
		);
	}

	renderSubtrees() {
		const { tree, getTree } = this.props;

		return tree.subtrees.map((subtreeId, index) => {
			var subtree = getTree(subtreeId);
			return <Subtree {...this.props} key={index} tree={subtree} />;
		})
	}
}

Tree.propTypes = {
	getTree: PropTypes.func.isRequired,
	tree: PropTypes.object.isRequired,
};

export default Tree;
