import React from 'react'

export default React.createClass({
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
    const {
      team,
      activeFilters: {
        search: activeSearch
      }
    } = this.props

    if (activeSearch !== '') {
      const activeSearchHighlight = `<span class="highlight">${activeSearch}</span>`
      return {
        __html: team.name.toLowerCase().replace(activeSearch, activeSearchHighlight)
      }
    } else {
      return {
        __html: team.name
      }
    }
  },

  // Select color value on click
  // http://stackoverflow.com/questions/6139107/programatically-select-text-in-a-contenteditable-html-element
  handleColorClick: function(e) {
    const range = document.createRange()
    range.selectNodeContents(e.target)
    const sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(range)
  },

  render: function() {
    const {
      team,
      activeFilters: {
        color: activeColor
      }
    } = this.props

    return (
      <li className='team'>
        <h3
          className='team-name'
          style={{backgroundImage: `url(assets/img/${team.league}/${team.id}.svg)`}}
          dangerouslySetInnerHTML={this.getTeamName()}
        />
        <ul className='colors'>
          {
            team.colors[activeColor].map((color, i) => {
              const paintedColor = team.colors.hex[i]
              return (
                  <li
                    key={i}
                    className={`color ${activeColor}`}
                    style={{backgroundColor: `#${paintedColor}`}}
                    onClick={this.handleColorClick}>
                    {color}
                  </li>
              )
            }, this)
          }
        </ul>
      </li>
    );
  }
});
