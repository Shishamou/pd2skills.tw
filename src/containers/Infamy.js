import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/infamy';
import InfamyTree from '../components/InfamyTree';
import InfamySide from '../components/InfamySide';
import ImageSpriteDrawer from '../public/ImageSpriteDrawer';

const sprite = new ImageSpriteDrawer('res/infamy.png', {size: 128});

class Infamy extends Component
{
    constructor(prop) {
        super(prop);
        this.getInfamy = this.getInfamy.bind(this);
        this.getPosInfamy = this.getPosInfamy.bind(this);
        this.reflowCanvas = this.reflowCanvas.bind(this);
    }

    getInfamy(id) {
        return this.props.infamyList[id];
    }

    getPosInfamy(row, col) {
        return this.props.infamyTable[row][col];
    }

    reflowCanvas(canvas, options) {
        var color = (function(options) {
            var { infamy, hover } = options;
            if (infamy.disable)
            return '#bf3247';
            if (infamy.owned || hover)
                return '#eee';
            if (infamy.unlocked)
                return '#607f93';
            return '#383c45';
        })(options);

        var pos = (function(options) {
            var { infamy } = options;
            return [
                'root',
                'technician',
                'mastermind',
                'enforcer',
                'ghost',
                'xp',
                'mask'
            ].indexOf(infamy.icon)
        })(options);

        sprite.draw(canvas, pos % 4, Math.floor(pos / 4), color);
    }

    render() {
        const { dispatch } = this.props;
        const { infamyTable, availablePoints } = this.props;
        const { locale, localeText } = this.props;

        const app = {
            locale,
            localeText,
            getInfamy: this.getInfamy,
            getPosInfamy: this.getPosInfamy,
            handleInfamyClick  : (id) => {dispatch(actions.handleInfamyClick(id))},
            handleInfamyRemove : (id) => {dispatch(actions.handleInfamyRemove(id))},
            handleInfamyEnter  : (id) => {dispatch(actions.handleInfamyEnter(id))},
            handleInfamyLeave  : (id) => {dispatch(actions.handleInfamyLeave(id))},
            reflowCanvas: this.reflowCanvas
        }

        var display = this.getInfamy(this.props.display);

        return (
            <div className="section sections-skill">
                <div className="section-main">
                    <InfamyTree {...app}
                        table={infamyTable}
                        available={availablePoints}
                    />
                </div>
                <InfamySide {...app} display={display} />
            </div>
        )
    }
}

Infamy.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
};

function select(state) {
    return state.infamy || {};
}

export default connect(select)(Infamy)
