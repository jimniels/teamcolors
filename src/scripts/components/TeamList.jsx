var React = require('react');
var TeamListItem = require('./TeamListItem');

var TeamList = React.createClass({
  propTypes: {
    teams: React.PropTypes.array.isRequired,
    activeColor: React.PropTypes.string.isRequired
  },

  render: function() {
    var activeColor = this.props.activeColor;
    return (
      <div className="wrapper">
        <ul className="teams">
          {(this.props.teams.length > 0)
            ?
              this.props.teams.map(function(team){
                return <TeamListItem key={team.id} team={team} activeColor={activeColor} />
              })
            : 
              <li>0 teams matching your filters</li>
          }
        </ul>
      </div>
    );
  }
});

module.exports = TeamList;
