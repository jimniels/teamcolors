module.exports = function (context, option) {
    return context.replace(/\s+/g, '-').toLowerCase();
};