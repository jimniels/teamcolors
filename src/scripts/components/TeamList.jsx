import React from 'react'
import TeamListItem from './TeamListItem'

export default React.createClass({
  propTypes: {
    teams: React.PropTypes.array.isRequired,
    activeFilters: React.PropTypes.object.isRequired
  },

  render: function() {
    const { activeFilters, teams } = this.props

    return (
      <div className='wrapper'>
        <ul className='teams'>
          { teams.length > 0
            ? teams.map(team =>
                <TeamListItem
                  key={team.id}
                  team={team}
                  activeFilters={activeFilters}
                />
              )
            : <li>0 teams matching your filters</li>
          }
        </ul>
      </div>
    );
  }
});
