/*
  NormalizeJSON
  This takes all our individual color data files and:
    - Combines them into one .json file
    - Converts missing RGB or HEX values and adds them to each teams
    - Adds additional meta info, like league name to each team
    - Flattens everything into a single array of all teams

  Each team should have an RGB *OR* HEX color values
  Some have both, which are slightly different,
  But not all have both, in which case we do some conversion on the fly
  And stick the converted values into our final .json file

  Returns a JSON file of all our data
*/
var gutil = require("gulp-util");
var jsoncombine = require("gulp-jsoncombine");
var rgbHexConversion = require("./rgbHexConversion");
var rgbToHex = rgbHexConversion.rgbToHex;
var hexToRgb = rgbHexConversion.hexToRgb;

module.exports = function() {
  return jsoncombine("team-colors.json", function(data){
    var massagedData = {
      teams: [],
      leagues: [],
      colors: ['hex', 'rgb', 'cmyk', 'pms']
    };
    for (var league in data) {
      var i = 0;
      var missing = [];
      var mode = '';

      // Make our list of leagues
      massagedData.leagues.push(league);

      // Add colors (if necessary) as well as id and league
      // Then add each team to our massageData
      if (data.hasOwnProperty(league)) {
        data[league].forEach(function(team){
          // No HEX but RBG
          if(!team.colors.hex && team.colors.rgb) {
            team.colors.hex = [];
            team.colors.rgb.forEach(function(color){
              team.colors.hex.push( rgbToHex(color) );
            });
            missing.push( team.team + ' ' + team.colors.hex );
            i++;
            mode = 'HEX';
          }
          // No RGB but HEX
          else if(!team.colors.rgb && team.colors.hex) {
            team.colors.rgb = [];
            team.colors.hex.forEach(function(color){
              team.colors.rgb.push( hexToRgb(color) );
            });
            missing.push( team.team + ' ' + team.colors.rgb );
            i++;
            mode = 'RGB';
          }

          // Add leage and ID to the team
          team.league = league;
          team.id = team.name.replace(/\s+/g, '-').toLowerCase();

          // Add the team to our massaged data
          massagedData.teams.push(team);
        });
      }
      // Log it
      if(i > 0){
        // Log league
        gutil.log('  ' + league.toUpperCase() + ' added ' + i + ' ' + mode + ' colors');
        // Log individual teams & added colors
        // for (var i = 0; i < missing.length; i++) {
        //     console.log('      '+missing[i]);
        // };
      }
    }
    // sort object alphabetically by team Name
    massagedData.teams.sort(function(a, b) {
        return (a.id < b.id) ? -1 : (a.id > b.id) ? 1 : 0;
    });

    return new Buffer(JSON.stringify(massagedData));
  })
}
