var gutil = require("gulp-util"),
    jsoncombine = require("gulp-jsoncombine"),
    rgbHexConversion = require("./rgbHexConversion"),
    rgbToHex = rgbHexConversion.rgbToHex,
    hexToRgb = rgbHexConversion.hexToRgb;

module.exports = function() {
    return jsoncombine("team-colors.json", function(data){
        for (var league in data) {
            var i = 0,
                missing = [],
                mode = '';
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
        return new Buffer(JSON.stringify(data));
    })
}