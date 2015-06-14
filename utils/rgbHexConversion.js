function rgbToHex(rgb){
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
    // returns space separated RGB values, i.e. "123 40 51"
    return result ?
        parseInt(result[1], 16) + ' ' +
        parseInt(result[2], 16) + ' ' +
        parseInt(result[3], 16)
    : null;
}

module.exports = {
    hexToRgb: hexToRgb,
    rgbToHex: rgbToHex
}