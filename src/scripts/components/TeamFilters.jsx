import React from 'react';
import debounce from '../utils/debounce';

export default React.createClass({
  propTypes: {
    activeFilters: React.PropTypes.object.isRequired,
    leagues: React.PropTypes.array.isRequired,
    colors: React.PropTypes.array.isRequired,
    onUserInput: React.PropTypes.func.isRequired,
  },

  // Debounce the keyup event
  // http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js/24679479#24679479
  componentWillMount: function () {
     this.delayedHandleChange = debounce(this.handleChange, 125);
  },

  handleKeyUp: function(e) {
    e.persist();
    this.delayedHandleChange();
  },

  handleChange: function(event) {
    this.props.onUserInput({
      'league': this.refs.leagueInput.value,
      'color': this.refs.colorInput.value,
      'search': this.refs.searchInput.value
    });
  },

  render: function() {
    const {
      leagues,
      colors,
      activeFilters: {
        league: activeLeague,
        color: activeColor,
        search: activeSearch
      }
    } = this.props

    return (
      <form className='team-filters'>
        <div className='wrapper'>
          <select
            ref='leagueInput'
            onChange={this.handleChange}
            value={activeLeague}>
              <option value=''>All leagues...</option>
              {leagues.map((league, i) =>
                <option key={i} value={league}>
                  {league.toUpperCase()}
                </option>
              )}
          </select>

          <select
            ref='colorInput'
            onChange={this.handleChange}
            value={activeColor}>
              {colors.map((color, i) =>
                <option key={i} value={color}>
                  {color.toUpperCase()} Colors
                </option>
              )}
          </select>

          <input
            ref='searchInput'
            onKeyUp={this.handleKeyUp}
            defaultValue={activeSearch}
            type='text'
            placeholder='Filter by team name...'
            autoComplete='off'
            autoCorrect='off'
            spellCheck='false'
          />
        </div>
      </form>
    );
  }
});
