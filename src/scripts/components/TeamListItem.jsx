var React = require('react');

var TeamItem = React.createClass({
  propTypes: {
    team: React.PropTypes.object.isRequired,
    activeColor: React.PropTypes.string.isRequired
  },

  render: function() {
    var team = this.props.team;
    var league = this.props.team.league;
    var id = this.props.team.id;
    var activeColor = this.props.activeColor;
    // var colors [];
    // this.props.team.colors[this.props.activeColor].forEach(function(color){
    //   colors.push()
    // })
    return (
      <li className="team">
        <h3 className="team-name" style={{backgroundImage: `url(assets/img/${league}/${id}.svg)`}}>
          {team.name}
        </h3>
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
