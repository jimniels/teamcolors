import { uniq, keys } from 'lodash'
import epl from './leagues/epl'
import mlb from './leagues/mlb'
import mls from './leagues/mls'
import nba from './leagues/nba'
import nfl from './leagues/nfl'
import nhl from './leagues/nhl'
import { rgbToHex, hexToRgb } from '../utils/rgbHexConversion'

/*
  Data Transformations

  For each league, manually do any transformations needed for the data
  Refer to the README for what needs to be done for each league

  We take all our individual color data files and:
    - Convert missing RGB or HEX values and add them to each team
    - Add additional meta info to each team, like league name and team ID
    - Flatten everything into a single array of all teams

  Each team should have an RGB *OR* HEX color values
  Some have both, which are slightly different,
  But not all have both, in which case we do some conversion on the fly
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

// Make a list of teams
const teams = []
  .concat(eplOut, mlbOut, mlsOut, nbaOut, nflOut, nhlOut)
  .sort((a, b) => (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0)

// Make a list of leagues out of teams
const leagues = uniq( teams.map(team => team.league) )

// Get list of all colors out of teams
// .map returns array of array, reduce flattens, uniq removes duplicates
const colors = uniq( teams.map(team => Object.keys(team.colors)).reduce((a, b) => a.concat(b)) )

// Export data
// export const data = {
const data = {
  teams,
  leagues,
  colors
}

module.exports = data


function convertNameToId(name) {
  return name.replace(/\s+/g, '-').toLowerCase();
}
