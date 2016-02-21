import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

// import * as actions from '../actions/infamy';

import InfamyTree from '../components/InfamyTree';
import InfamySide from '../components/InfamySide';

class Infamy extends Component
{
    constructor(prop) {
        super(prop);
        this.getInfamy = this.getInfamy.bind(this);
        this.getPosInfamy = this.getPosInfamy.bind(this);
    }

    getInfamy(id) {
        return this.props.infamyList[id];
    }

    getPosInfamy(row, col) {
        return this.props.infamyTable[row][col];
    }

    render() {
        const { dispatch } = this.props;
        const { infamyTable, availablePoints } = this.props;
        const { locale, localeText } = this.props;

        const app = {
            locale,
            localeText,
            getInfamy: this.getInfamy,
            getPosInfamy: this.getPosInfamy
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
