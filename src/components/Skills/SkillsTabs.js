import React, { Component, PropTypes } from 'react';

class SkillsTabs extends Component
{
	render() {
		const { locale, trees, activedTree, onClick } = this.props;

		return (
			<div className="section-tabs">
				<div className="section-tabs-main">
					<div className="section-tabs-contain">
						{trees.map((tree, index) =>
							<li key={index}
								className={(index === activedTree)? 'section-tab actived' : 'section-tab'}
								onClick={(e) => {onClick(index)}}
							>
								<span>{locale(`st_menu_${tree.name}`)}</span>
								<span>({tree.spendPoints})</span>
							</li>
						)}
					</div>
				</div>
			</div>
		);
	}
}

SkillsTabs.propTypes = {
	locale: PropTypes.func.isRequired,
	trees: PropTypes.array.isRequired,
	activedTree: PropTypes.number,
	onClick: PropTypes.func.isRequired,
};

export default SkillsTabs;
