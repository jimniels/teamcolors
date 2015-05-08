module.exports = function (context, option) {
    
    if(option == 'hex') {

    } else if (option == 'rgb') {

    }

    // Split RGB str into individual pieces and convert to int
    var rgb = context.split(' '),
        r = parseInt(rgb[0]);
        g = parseInt(rgb[1]);
        b = parseInt(rgb[2]);
    
    // Convert RGB to HEX
    // http://stackoverflow.com/questions/1133770/how-do-i-convert-a-string-into-an-integer-in-javascript
    function componentToHex(c) {
        var hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
    }
    
    // Returns '34ef25'
    return 'test';
};