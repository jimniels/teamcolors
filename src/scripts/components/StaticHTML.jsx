var React = require('react');

var InitialHTML = React.createClass({
  propTypes: {
      teams: React.PropTypes.array.isRequired
  },

  render: function() {
    var teams = this.props.teams;

    return (
        <ul>
          {
            teams.map(function(team){
              var colorModes = [];
              var colorDefinitions = [];
              for (colorMode in team.colors) {
                if(team.colors.hasOwnProperty(colorMode)){
                  colorDefinitions.push(<dt key={colorMode}>{colorMode.toUpperCase()}</dt>);

                  team.colors[colorMode].forEach(function(color){
                    colorDefinitions.push(<dd key={color}>{color}</dd>);
                  });
                }
              }
              return (
                <li key={team.id}>
                  <h4>{team.name}</h4>
                  <dl>{colorDefinitions}</dl>
                </li>
              )
            })
          }
        </ul>
    );
  }
});

module.exports = InitialHTML;
