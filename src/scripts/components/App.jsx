import React from 'react';
import TeamList from './TeamList';
import TeamFilters from './TeamFilters';

var TeamColors = React.createClass({
  propTypes: {
    teams: React.PropTypes.array.isRequired,
    leagues: React.PropTypes.array.isRequired,
    colors: React.PropTypes.array.isRequired,
    threshold: React.PropTypes.number.isRequired,
    initialColor: React.PropTypes.string,
    initialLeague: React.PropTypes.string,
    initialSearch: React.PropTypes.string
  },

  getInitialState: function(){

    // Intial filters
    var activeFilters = {
      color: (this.props.initialColor ? this.props.initialColor : ''),
      league: (this.props.initialLeague ? this.props.initialLeague : ''),
      search: (this.props.initialSearch ? this.props.initialSearch : '')
    };

    // Filter teams by passed in vals
    var filteredTeams = this.getFilteredTeams(activeFilters);

    // Return the initial state
    return {
      activeFilters: activeFilters,
      visibleTeams: filteredTeams.slice(0, this.props.threshold),
      allTeams: filteredTeams
    };
  },

  componentDidMount: function(){
    /*
      Handle scroll
      Throttle the scroll event and detect if we're at the bottom of the page
      If we are, show more teams
    */
    var throttle = function(fn, threshhold, scope) {
      threshhold || (threshhold = 250);
      var last,
          deferTimer;
      return function () {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
          // hold on to it
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function () {
            last = now;
            fn.apply(context, args);
          }, threshhold);
        } else {
          last = now;
          fn.apply(context, args);
        }
      };
    }
    window.onscroll = throttle(function(){
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.handleShowMore();
      }
    }, 150, this);
  },

  handleShowMore: function() {
    var sliceBegin = this.state.visibleTeams.length;
    var sliceEnd = sliceBegin + this.props.threshold;
    var newTeams = this.state.allTeams.slice(sliceBegin, sliceEnd);
    this.setState({
      visibleTeams: this.state.visibleTeams.concat(newTeams)
    });
  },

  // User input filters
  handleUserInput: function(activeFilters) {
    var filteredTeams = this.getFilteredTeams(activeFilters);
    this.setState({
      activeFilters: activeFilters,
      visibleTeams: filteredTeams.slice(0, this.props.threshold),
      allTeams: filteredTeams
    });
  },

  // Return an array of teams (filtered if relevant)
  getFilteredTeams: function(activeFilters) {
    return this.props.teams.filter(function(team) {

      if(activeFilters.league !== '') {
        if(activeFilters.league !== team.league){
          return false;
        }
      }

      if(activeFilters.color !== ''){
        if( !(activeFilters.color in team.colors) ) {
          return false;
        }
      }

      if(activeFilters.search !== ''){
        var name = team.name.toLowerCase();
        var search = activeFilters.search.toLowerCase();
        if(name.indexOf(search) !== 0) {
          return false;
        }
      }

      return true;
    });
  },

  render: function() {
    var activeFilters = this.state.activeFilters;
    var leagues = this.props.leagues;
    var colors = this.props.colors;
    var visibleTeams = this.state.visibleTeams;
    var allTeams = this.state.allTeams;

    return (
      <div>
        <TeamFilters
          activeFilters={activeFilters}
          onUserInput={this.handleUserInput}
          leagues={leagues}
          colors={colors}
        />
        <TeamList
          teams={visibleTeams}
          activeFilters={activeFilters}
        />
        {
          (visibleTeams.length < allTeams.length)
          ?
            <p className="loading">
              Loading more...
            </p>
          : null
        }
      </div>
    );
  }
});

module.exports = TeamColors;
