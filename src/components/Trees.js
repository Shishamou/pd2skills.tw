import React, { Component, PropTypes } from 'react';
import Tree from './Tree';

class Trees extends Component
{
	render() {
        const { dispatch, trees } = this.props;

        return (
            <div className="trees">
                {trees.map((tree, index) =>
                    <Tree
						{...this.props}
                        key={index}
                        tree={tree}
                    />
                )}
            </div>
        )
    }
}

Trees.propTypes = {
	trees: PropTypes.array.isRequired,
	getTier: PropTypes.func.isRequired,
	getSkill: PropTypes.func.isRequired,
	handleEvent: PropTypes.func.isRequired,
};

export default Trees;
