import React, { Component, PropTypes } from 'react';

class TreeTabs extends Component
{
	render() {
		const { app, trees, currectTree, onClick } = this.props;

        return (
			<ul className="section-tabs">
				{trees.map((tree, index) =>
		            <li key={index}
		                className={(tree === currectTree)? 'actived' : ''}
		                onClick={(e)=>{onClick(index)}}
		            >{app.locale(`st_menu_${tree.name}`)}</li>
		        )}
			</ul>
        );
    }
}

TreeTabs.propTypes = {
	app: PropTypes.object.isRequired,
	trees: PropTypes.array.isRequired,
	currectTree: PropTypes.object,
	onClick: PropTypes.func.isRequired
};

export default TreeTabs;
