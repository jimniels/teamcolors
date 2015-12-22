var fse = require('fs-extra')
var React = require('react')
var ReactDOMServer = require('react-dom/server')
var webpackRequire = require('webpack-require')

var webpackConfig = require('./webpack.config.js')
var template = require('./template.js')

webpackRequire(webpackConfig, template, function (error, factory) {

  if (error) { console.error(error) }

  var templateComponent = factory()

  var html = ReactDOMServer.renderToStaticMarkup(React.createElement(templateComponent, {
    title: 'Homepage',
    body_content: 'Hello World!'
  }))

  fse.outputFileSync('./indexz.html', '<!doctype html>' + html)

})
