var React = require('react');

var Input = React.createClass({
    propTypes: {
        value: React.PropTypes.string,
    },
    getDefaultProps: function() {
        return {value: "User"};
    },
    getInitialState: function() {
        return {value: this.props.value};
    },
    handleChange: function(e) {
        this.setState({value: e.target.value});
    },
    render: function() {
        return (
            <div>
                <input type="text" onChange={this.handleChange}/>
                <p>{this.state.value}</p>
            </div>
        );
    }
});

module.exports = Input;
