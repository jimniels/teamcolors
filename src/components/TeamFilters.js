import React, { Component } from "react";
import { array, func, object } from "prop-types";
import debounce from "../utils/debounce.js";

export default class TeamFilters extends Component {
  static propTypes = {
    activeFilters: object.isRequired,
    leagues: array.isRequired,
    colors: array.isRequired,
    colorsByLeague: object.isRequired,
    onUserInput: func.isRequired
  };

  // Debounce the keyup event
  // http://stackoverflow.com/questions/23123138/perform-debounce-in-react-js/24679479#24679479
  componentWillMount() {
    this.delayedHandleChange = debounce(this.handleChange, 125);
  }

  handleKeyUp = e => {
    e.persist();
    this.delayedHandleChange();
  };

  handleChange = () => {
    this.props.onUserInput({
      league: this.refs.leagueInput.value,
      color: this.refs.colorInput.value,
      search: this.refs.searchInput.value
    });
  };

  render() {
    const {
      leagues,
      colors,
      colorsByLeague,
      activeFilters: {
        league: activeLeague,
        color: activeColor,
        search: activeSearch
      }
    } = this.props;

    return (
      <form className="team-filters">
        <div className="wrapper">
          <select
            ref="leagueInput"
            onChange={this.handleChange}
            value={activeLeague}
          >
            <option value="">All leagues...</option>
            {leagues.sort().map((league, i) => {
              let disabled;
              if (activeColor && colorsByLeague[league].includes(activeColor)) {
                disabled = false;
              } else {
                disabled = true;
              }

              return (
                <option key={i} value={league} disabled={disabled}>
                  {league.toUpperCase()}
                </option>
              );
            })}
          </select>

          <select
            ref="colorInput"
            onChange={this.handleChange}
            value={activeColor}
          >
            <optgroup label="Color mode">
              {colors.map((color, i) => {
                let disabled;
                if (
                  activeLeague === "" ||
                  colorsByLeague[activeLeague].includes(color)
                ) {
                  disabled = false;
                } else {
                  disabled = true;
                }

                return (
                  <option key={i} value={color} disabled={disabled}>
                    {color.toUpperCase()}
                  </option>
                );
              })}
            </optgroup>
          </select>

          <input
            ref="searchInput"
            onKeyUp={this.handleKeyUp}
            defaultValue={activeSearch}
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
}
