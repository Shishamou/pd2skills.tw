import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../actions/infamy';

import InfamyTree from '../components/Infamy/InfamyTree';
import InfamySide from './InfamySide';

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

    reflowCanvas(canvas, datas) {
        const { infamy, hover } = datas;

        var color = (function(infamy, hover) {
            if (infamy.disable)
                return 'alert';
            if (infamy.owned || hover)
                return 'normal';
            if (infamy.unlocked)
                return 'gray';
            return 'dark';
        })(infamy, hover);

        this.props.drawIcon(`infamy_${infamy.icon}`, canvas, color);
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

        return (
            <div className="section sections-infamy">
                <div className="section-main">
                    <InfamyTree {...app}
                        table={infamyTable}
                        available={availablePoints}
                    />
                </div>
                <InfamySide {...this.props} />
            </div>
        )
    }
}

Infamy.propTypes = {
	locale: PropTypes.func.isRequired,
	localeText: PropTypes.func.isRequired,
	drawIcon: PropTypes.func.isRequired,
};

function select(state) {
    return state.infamy || {};
}

export default connect(select)(Infamy)
