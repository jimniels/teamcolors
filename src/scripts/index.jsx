import React from 'react';
import ReactDOM from 'react-dom';
import {uniq} from 'lodash';
import App from './components/App';
import convertNameToId from './utils/convertNameToId';
import {rgbToHex, hexToRgb} from './utils/rgbHexConversion';

// Get our team data, massage it, then render it
const request = new XMLHttpRequest();
request.open('GET', 'static/data/teams.json', true);
request.onload = () => {
  if (request.status >= 200 && request.status < 400) {

    // Success! Now massage the team data as needed
    const teams = massageTeamsData(JSON.parse(request.responseText));

    // Render the App
    ReactDOM.render(
      <App
        teams={teams}
        leagues={getLeagues(teams)}
        colors={getColors(teams)}
        colorsByLeague={getColorsByLeague(teams)}
        threshold={40}
        initialColor={'hex'}
      />,
      document.getElementById('content')
    );
  } else {
    // @TODO improve error state
    // We reached our target server, but it returned an error
  }
};

// @TODO improve error state
request.onerror = () => {
  // There was a connection error of some sort
};

// Kick it off!
request.send();

/**
 * Massage JSON by looping through all the teams and:
 *   1. Add a team ID
 *   2. If there's no HEX, convert the RGB to HEX and add it
 *   3. If there's no RGB, convert the HEX to RGB and add it
 *   4. Sort by team id
 *
 * @param {Object[]} - Original JSON values of teams
 * @return {Object[]} - Modified to include `id` and `hex` or `rgb` key/value
 *                      pairs (if missing) and sorted by team `id`
 */
function massageTeamsData(data) {
  let out = data.map(team => {
    team.id = convertNameToId(team.name);
    if (!team.colors.hex) {
      team.colors.hex = team.colors.rgb.map(color => rgbToHex(color));
    }
    if (!team.colors.rgb) {
      team.colors.rgb = team.colors.hex.map(color => hexToRgb(color));
    }

    return team;
  });

  out.sort((a, b) => (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0);

  return out;
}

/**
 * Pluck out a unique list of leagues from the team data
 * @param {Object[]} - List of all teams
 * @return {Array.<string>} - List of leagues
 */
function getLeagues(teams) {
  return uniq(
    teams.map(team => team.league)
  );
}

/**
 * Pluck out a unique list of color modes from the team data
 * @param {Object[]} - List of all teams
 * @return {Array.<string>} - List of leagues
 */
function getColors(teams) {
  return uniq(
    teams
      .map(team => Object.keys(team.colors))
      .reduce((a, b) => a.concat(b))
  );
}

/**
 * Generate a unique list of leagues from the team data
 * Object mapping color support
 */
function getColorsByLeague(teams) {
  let colorsByLeague = {};
  teams.map(team => {
    if ( !(colorsByLeague[team.league]) ) {
      colorsByLeague[team.league] = Object.keys(team.colors);
    }
  })
  return colorsByLeague;
}
