var React = require('./React');

var Team = React.createClass({
  render: function(){
    return <li>TEST {this.props.name}</li>
  }
});

module.exports = Team;
