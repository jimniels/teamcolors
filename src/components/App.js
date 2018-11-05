import React, { Component } from "react";
import { array, object, number, string } from "prop-types";
import fuzzy from "fuzzy";
import TeamList from "./TeamList.js";
import TeamFilters from "./TeamFilters.js";

export default class App extends Component {
  static propTypes = {
    teams: array.isRequired,
    leagues: array.isRequired,
    colors: array.isRequired,
    colorsByLeague: object.isRequired,
    threshold: number.isRequired,
    initialColor: string,
    initialLeague: string,
    initialSearch: string
  };

  constructor(props) {
    super(props);

    // @TODO Add ability to pass these initial state via the URL
    // Intial filters
    const activeFilters = {
      color: props.initialColor || "",
      league: props.initialLeague || "",
      search: props.initialSearch || ""
    };

    // Filter teams by passed in vals
    const filteredTeams = this.getFilteredTeams(activeFilters);

    this.state = {
      activeFilters: activeFilters,
      visibleTeams: filteredTeams.slice(0, props.threshold),
      allTeams: filteredTeams
    };
  }

  componentDidMount() {
    // Handle scroll
    // Throttle the scroll event and detect if we're at the bottom of the page
    // If we are, show more teams
    var throttle = function(fn, threshhold, scope) {
      threshhold || (threshhold = 250);
      var last, deferTimer;
      return function() {
        var context = scope || this;

        var now = +new Date(),
          args = arguments;
        if (last && now < last + threshhold) {
          // hold on to it
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function() {
            last = now;
            fn.apply(context, args);
          }, threshhold);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    };
    window.onscroll = throttle(
      function() {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
          this.handleShowMore();
        }
      },
      150,
      this
    );
  }

  handleShowMore = () => {
    const sliceBegin = this.state.visibleTeams.length;
    const sliceEnd = sliceBegin + this.props.threshold;
    const newTeams = this.state.allTeams.slice(sliceBegin, sliceEnd);
    this.setState({
      visibleTeams: this.state.visibleTeams.concat(newTeams)
    });
  };

  // User input filters
  handleUserInput = activeFilters => {
    const filteredTeams = this.getFilteredTeams(activeFilters);
    this.setState({
      activeFilters: activeFilters,
      visibleTeams: filteredTeams.slice(0, this.props.threshold),
      allTeams: filteredTeams
    });
  };

  // Return an array of teams (filtered if relevant)
  getFilteredTeams = activeFilters => {
    const { teams } = this.props;
    return teams.filter(team => {
      if (activeFilters.league !== "") {
        if (activeFilters.league !== team.league) {
          return false;
        }
      }

      if (activeFilters.color !== "") {
        if (!(activeFilters.color in team.colors)) {
          return false;
        }
      }

      // @TODO possibly fix to fit array of multiple, not single, items
      if (activeFilters.search !== "") {
        if (fuzzy.filter(activeFilters.search, [team.name]).length === 0) {
          return false;
        }
      }

      return true;
    });
  };

  render() {
    const { activeFilters, allTeams, visibleTeams } = this.state;

    const { leagues, colors, colorsByLeague } = this.props;

    return (
      <div>
        <TeamFilters
          activeFilters={activeFilters}
          onUserInput={this.handleUserInput}
          leagues={leagues}
          colors={colors}
          colorsByLeague={colorsByLeague}
        />
        <TeamList teams={visibleTeams} activeFilters={activeFilters} />
        {visibleTeams.length < allTeams.length ? (
          <p className="loading">Loading more...</p>
        ) : null}
      </div>
    );
  }
}
