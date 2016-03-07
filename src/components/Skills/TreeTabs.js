import React, { Component, PropTypes } from 'react';

class TreeTabs extends Component
{
	render() {
		const { trees, currectTree, onClick } = this.props;
		const { locale, localeText } = this.props;

        return (
			<ul className="section-tabs">
				{trees.map((tree, index) =>
		            <li key={index}
		                className={(tree === currectTree)? 'actived' : ''}
		                onClick={(e)=>{onClick(index)}}
		            >
						<span>{locale(`st_menu_${tree.name}`)}</span>
						<span>({tree.spendPoints})</span>
					</li>
		        )}
			</ul>
        );
    }
}

TreeTabs.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	trees: PropTypes.array.isRequired,
	currectTree: PropTypes.object,
	onClick: PropTypes.func.isRequired
};

export default TreeTabs;
