var React = require('react');
var TeamListItem = require('./TeamListItem');

var TeamList = React.createClass({
  propTypes: {
    teams: React.PropTypes.array.isRequired,
    activeFilters: React.PropTypes.object.isRequired
  },

  render: function() {
    var activeFilters = this.props.activeFilters;
    var teams = this.props.teams;

    return (
      <div className="wrapper">
        <ul className="teams">
          {(teams.length > 0)
            ?
              teams.map(function(team){
                return <TeamListItem key={team.id} team={team} activeFilters={activeFilters} />
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
