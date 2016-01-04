import { uniq } from 'lodash'
import epl from './leagues/epl'
import mlb from './leagues/mlb'
import mls from './leagues/mls'
import nba from './leagues/nba'
import nfl from './leagues/nfl'
import nhl from './leagues/nhl'
import { rgbToHex, hexToRgb } from '../utils/rgbHexConversion'

/*
 * League Data Massage
 * For each league, we manually do data transformations
 * Refer to the README for what needs to be done to each league
 *
 * Each team should have an RGB *or* HEX color set
 * Some teams have both, which are slightly different,
 * But not all have both, in which case we do some conversion on the fly
 * We take all our individual league color files and:
 *    - Convert missing RGB or HEX values and add them to each team
 *    - Add additional meta info to each team, like league name and team ID
 *    - Flatten everything into a single array of all teams
 */
const eplOut = epl.map(team => {
  team.league = 'epl'
  team.id = convertNameToId(team.name)
  team.colors.rgb = team.colors.hex.map(color => hexToRgb(color))
  return team
})

const mlsOut = mls.map(team => {
  team.league = 'mls'
  team.id = convertNameToId(team.name)
  team.colors.rgb = team.colors.hex.map(color => hexToRgb(color))
  return team
})

const nhlOut = nhl.map(team => {
  team.league = 'nhl'
  team.id = convertNameToId(team.name)
  team.colors.rgb = team.colors.hex.map(color => hexToRgb(color))
  return team
})

const mlbOut = mlb.map(team => {
  team.league = 'mlb'
  team.id = convertNameToId(team.name)
  team.colors.rgb = team.colors.hex.map(color => hexToRgb(color))
  return team
})

const nbaOut = nba.map(team => {
  team.league = 'nba'
  team.id = convertNameToId(team.name)
  team.colors.hex = team.colors.rgb.map(color => rgbToHex(color))
  return team
})

const nflOut = nfl.map(team => {
  team.league = 'nfl'
  team.id = convertNameToId(team.name)
  return team
})

/**
 * Export transformed data
 * All transformed data exported as an object and used in our react app
 *
 * teams {array} - An array of objects representing each imported team of data
 * leagues {array} - An array of strings representing each league, sorted alphabetically
 * colors {array} - An array of strings representing each color mode
 * colorsByLeage {object} - A mapping of which leagues support which colors
 */

// Array of team data
const teams = []
  .concat(eplOut, mlbOut, mlsOut, nbaOut, nflOut, nhlOut)
  .sort((a, b) => (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0)

// Array of league names
const leagues = uniq( teams.map(team => team.league) )

// Array of color modes
// .map returns array of array, reduce flattens, uniq removes duplicates
const colors = uniq( teams.map(team => Object.keys(team.colors)).reduce((a, b) => a.concat(b)) )

// Object mapping color support
let colorsByLeague = {}
teams.map(team => {
  if ( !(colorsByLeague[team.league]) ) {
    colorsByLeague[team.league] = Object.keys(team.colors)
  }
})

// Export it all
module.exports = {
  teams,
  leagues,
  colors,
  colorsByLeague
}

/**
 * Convert Name to ID
 * Take a string (usually a team name) with spaces and mixed casing,
 * convert it to a lowercased, hyphen-separated string representing an ID
 *
 * @param {string} name
 * @returns {string} id
 */
function convertNameToId(name) {
  return name.replace(/\s+/g, '-').toLowerCase()
}
