// Support ES6, React for imported files
require('babel-core/register')({
  presets: ['es2015', 'react']
});

// Dependencies
var path = require('path')
var fs = require('fs')
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var Static = require('./components/Static')
var data = require('./data/index')

// Render static markup from component
var html = ReactDOMServer.renderToStaticMarkup(React.createElement(
  Static,
  {teams: data.teams}
))

// Write to file
fs.writeFileSync('indexStatic.html', html)
