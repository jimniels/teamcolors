'use strict';

module.exports = function(grunt) {

    grunt.registerTask('colorify', 'JSON stuff', function(){

        var self = this;

        // this.data here contains your configuration


        function rgbTohex(rgb){    
            // Split RGB str into individual pieces and convert to int
            var rgb = rgb.split(' '),
                r = parseInt(rgb[0]),
                g = parseInt(rgb[1]),
                b = parseInt(rgb[2]);
            // Convert RGB to HEX
            // http://stackoverflow.com/questions/1133770/how-do-i-convert-a-string-into-an-integer-in-javascript
            function componentToHex(c) {
                var hex = c.toString(16);
                return hex.length == 1 ? "0" + hex : hex;
            }
            // Returns '34ef25'
            return componentToHex(r) + componentToHex(g) + componentToHex(b);
        }
        function hexToRgb(hex) {
            // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
            var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
                return r + r + g + g + b + b;
            });

            var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? 
                parseInt(result[1], 16) + ' ' + 
                parseInt(result[2], 16) + ' ' +
                parseInt(result[3], 16)
            : null;
        }

        // add rgb or hex if needed
        var d = grunt.file.readJSON('assets/data/missing-pieces.json');
        d.forEach(function(leagues){
            leagues.teams.forEach(function(team){
                // No HEX but RBG
                if(!team.colors.hex && team.colors.rgb) {
                    team.colors.hex = [];
                    team.colors.rgb.forEach(function(color){
                        team.colors.hex.push( rgbTohex(color) );
                    });
                    grunt.log.errorlns('Missing HEX: ' + team.team + '; Added ' + grunt.log.wordlist(team.colors.hex));
                }
                // No RGB but HEX 
                else if(!team.colors.rgb && team.colors.hex) {
                    team.colors.rgb = [];
                    team.colors.hex.forEach(function(color){
                        team.colors.rgb.push( hexToRgb(color) );
                    });
                    grunt.log.errorlns('Missing RGB: ' + team.team + '; Added ' + grunt.log.wordlist(team.colors.rgb));
                }
            });
        });
        // write it to a file
        grunt.file.write('assets/data/parsed.json', JSON.stringify(d));



    });
};