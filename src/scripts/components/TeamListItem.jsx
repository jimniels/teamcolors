var React = require('react');

var TeamItem = React.createClass({
  propTypes: {
    team: React.PropTypes.object.isRequired,
    activeFilters: React.PropTypes.object.isRequired
  },

  /*
    Team name
    Why is this dangerouslySetInnerHTML?
    When there is an active search, we highlight the active search term in the
    team name using <span> tags.
    If there's no active search, we just return the team name in plain text.
  */
  getTeamName: function(){
    var team = this.props.team;
    var activeSearch = this.props.activeFilters.search;

    if(activeSearch !== '') {
      var activeSearchHighlight = '<span class="highlight">' + activeSearch + '</span>';
      return {
        __html: team.name.toLowerCase().replace(activeSearch, activeSearchHighlight)
      }
    } else {
      return {
        __html: team.name
      }
    }
  },

  render: function() {
    var team = this.props.team;
    var activeColor = this.props.activeFilters.color;

    return (
      <li className="team">
        <h3
          className="team-name"
          style={{backgroundImage: `url(assets/img/${team.league}/${team.id}.svg)`}}
          dangerouslySetInnerHTML={this.getTeamName()}
        />
        <ul className="colors">
          {
            team.colors[activeColor].map(function(color, i){
              var paintedColor = team.colors.hex[i];
              return (
                  <li
                    key={i}
                    className={`color ${activeColor}`}
                    style={{backgroundColor: `#${paintedColor}`}}>
                    {color}
                  </li>
              )
            })
          }
        </ul>
      </li>
    );
  }
});

module.exports = TeamItem;
