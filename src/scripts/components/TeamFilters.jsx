import React from 'react';
import debounce from '../utils/debounce';

var TeamFilters = React.createClass({
  propTypes: {
    activeFilters: React.PropTypes.object.isRequired,
    leagues: React.PropTypes.array.isRequired,
    colors: React.PropTypes.array.isRequired,
    onUserInput: React.PropTypes.func.isRequired,
  },

  // Debounce the keyup event
  // http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js/24679479#24679479
  componentWillMount: function () {
     this.delayedHandleChange = debounce(this.handleChange, 250);
  },
  handleKeyUp: function(e) {
    e.persist();
    this.delayedHandleChange();
  },

  handleChange: function(event) {
    this.props.onUserInput({
      'league': this.refs.leagueInput.getDOMNode().value,
      'color': this.refs.colorInput.getDOMNode().value,
      'search': this.refs.searchInput.getDOMNode().value
    });
  },

  render: function() {
    return (
      <form className="team-filters">
        <div className="wrapper">
          <select
            ref="leagueInput"
            onChange={this.handleChange}
            value={this.props.activeFilters.league}>
              <option value="">All leagues...</option>
              {this.props.leagues.map(function(league, i){
                return <option key={i} value={league}>{league.toUpperCase()}</option>;
              })}
          </select>

          <select
            ref="colorInput"
            onChange={this.handleChange}
            value={this.props.activeFilters.color}>
              {this.props.colors.map(function(color, i){
                return <option key={i} value={color}>{color.toUpperCase()}</option>;
              })}
          </select>

          <input
            ref="searchInput"
            onKeyUp={this.handleKeyUp}
            defaultValue={this.props.activeFilters.search}
            type="text"
            placeholder="Filter by team name..."
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
          />
        </div>
      </form>
    );
  }
});

module.exports = TeamFilters;
