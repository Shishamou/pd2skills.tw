import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Perk from './Perk';

class Perks extends Component
{
  constructor(props) {
    super(props);
    this.actived = props.activedPerk;
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { activedPerk } = this.props;

    if (this.actived === activedPerk) return;
    this.actived = activedPerk;

    var ref = this.refs[`perk_${activedPerk}`];
    if ( ! ref) return;

    var node = ReactDOM.findDOMNode(ref);
    if (this.shouldScrollTo(node)) {
      node.scrollIntoView({behavior: "auto"});
    }
  }

  shouldScrollTo(element) {
    var container = this.refs.container;

    var scrollTop = container.scrollTop;
    var scrollBottom = scrollTop + container.offsetHeight;

    var elementTop = element.offsetTop;
    var elementBottom = elementTop + element.offsetHeight;

    if (elementTop < scrollTop) return true;
    if (elementBottom > scrollBottom) return true;

    return false;
  }

  render() {
    const { perks, activedPerk } = this.props;

    return (
      <div className="perks" ref="container">
        {perks.map((perk, index) =>
          <Perk
            {...this.props}
            key={index}
            ref={`perk_${index}`}
            perk={perk}
            actived={activedPerk === index}
          />
        )}
      </div>
    );
  }
}

Perks.propTypes = {
  perks: PropTypes.array.isRequired,
  activedPerk: PropTypes.number,
};

export default Perks;
