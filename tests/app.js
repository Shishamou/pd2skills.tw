var React = require('react');

var App = React.createClass({
    propTypes: {
        model: React.PropTypes.object.isRequired,
    },
    getInitialState: function() {
        return {value: this.props.model.value || ""};
    },s
    render: function() {
        return (
            <h1>Hello, {this.state.value}</h1>
        );
    }
});

module.exports = App;
