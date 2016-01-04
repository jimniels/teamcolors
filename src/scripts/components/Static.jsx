import React from 'react'

var StaticHtml = React.createClass({

  PropTypes: {
    teams: React.PropTypes.array.isRequired
  },

  render: function() {
    const { teams } = this.props

    return (
      <html>
        <head>
          <title>
            TeamColors: Find and copy color values from your favorite sports teams.
          </title>
          <meta name='viewport' content='width=device-width, initial-scale=1' />
        </head>
        <body>
          <h1>
            TeamColors: Find and copy color values from your favorite sports teams.
          </h1>
          <h2>
            For an interactive version of this site, <a href='/'>click here</a>.
          </h2>
          <ul>
            {
              teams.map(function(team){

                let colorDefinitions = []
                for (var colorMode in team.colors) {
                  if (team.colors.hasOwnProperty(colorMode)){
                    colorDefinitions.push(
                      <dt key={colorMode}>
                        {colorMode.toUpperCase()}
                      </dt>
                    )
                    team.colors[colorMode].forEach(color =>
                      colorDefinitions.push(
                        <dd key={color}>
                          {color}
                        </dd>
                      )
                    )
                  }
                }

                return (
                  <li key={team.id}>
                    <h4>
                      {team.name}
                    </h4>
                    <dl>
                      {colorDefinitions}
                    </dl>
                  </li>
                )
              })
            }
          </ul>
        </body>
      </html>
    )
  }
})

module.exports = StaticHtml
