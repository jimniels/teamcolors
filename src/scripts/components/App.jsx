import React from 'react'
import TeamList from './TeamList'
import TeamFilters from './TeamFilters'

export default React.createClass({

  propTypes: {
    teams: React.PropTypes.array.isRequired,
    leagues: React.PropTypes.array.isRequired,
    colors: React.PropTypes.array.isRequired,
    colorsByLeague: React.PropTypes.object.isRequired,
    threshold: React.PropTypes.number.isRequired,
    initialColor: React.PropTypes.string,
    initialLeague: React.PropTypes.string,
    initialSearch: React.PropTypes.string
  },

  getInitialState: function(){

    // @TODO Add ability to pass these initial state via the URL
    // Intial filters
    const activeFilters = {
      color: this.props.initialColor ? this.props.initialColor : '',
      league: this.props.initialLeague ? this.props.initialLeague : '',
      search: this.props.initialSearch ? this.props.initialSearch : ''
    }

    // Filter teams by passed in vals
    const filteredTeams = this.getFilteredTeams(activeFilters)

    // Return the initial state
    return {
      activeFilters: activeFilters,
      visibleTeams: filteredTeams.slice(0, this.props.threshold),
      allTeams: filteredTeams
    }
  },

  componentDidMount: function(){
    // Handle scroll
    // Throttle the scroll event and detect if we're at the bottom of the page
    // If we are, show more teams
    var throttle = function(fn, threshhold, scope) {
      threshhold || (threshhold = 250)
      var last,
          deferTimer
      return function () {
        var context = scope || this

        var now = +new Date,
            args = arguments
        if (last && now < last + threshhold) {
          // hold on to it
          clearTimeout(deferTimer)
          deferTimer = setTimeout(function () {
            last = now
            fn.apply(context, args)
          }, threshhold)
        } else {
          last = now
          fn.apply(context, args)
        }
      }
    }
    window.onscroll = throttle(function(){
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.handleShowMore()
      }
    }, 150, this)
  },

  handleShowMore: function() {
    const sliceBegin = this.state.visibleTeams.length
    const sliceEnd = sliceBegin + this.props.threshold
    const newTeams = this.state.allTeams.slice(sliceBegin, sliceEnd)
    this.setState({
      visibleTeams: this.state.visibleTeams.concat(newTeams)
    })
  },

  // User input filters
  handleUserInput: function(activeFilters) {
    const filteredTeams = this.getFilteredTeams(activeFilters)
    this.setState({
      activeFilters: activeFilters,
      visibleTeams: filteredTeams.slice(0, this.props.threshold),
      allTeams: filteredTeams
    })
  },

  // Return an array of teams (filtered if relevant)
  getFilteredTeams: function(activeFilters) {
    const { teams } = this.props
    return teams.filter(team => {

      if(activeFilters.league !== '') {
        if(activeFilters.league !== team.league){
          return false
        }
      }

      if(activeFilters.color !== ''){
        if( !(activeFilters.color in team.colors) ) {
          return false
        }
      }

      if(activeFilters.search !== ''){
        const name = team.name.toLowerCase()
        const search = activeFilters.search.toLowerCase()
        if(name.indexOf(search) !== 0) {
          return false
        }
      }

      return true
    })
  },

  render: function() {
    const {
      activeFilters,
      allTeams,
      visibleTeams
    } = this.state

    const {
      leagues,
      colors,
      colorsByLeague
    } = this.props

    return (
      <div>
        <TeamFilters
          activeFilters={activeFilters}
          onUserInput={this.handleUserInput}
          leagues={leagues}
          colors={colors}
          colorsByLeague={colorsByLeague}
        />
        <TeamList
          teams={visibleTeams}
          activeFilters={activeFilters}
        />
        {
          visibleTeams.length < allTeams.length
          ? <p className='loading'>
              Loading more...
            </p>
          : null
        }
      </div>
    )
  }
})
