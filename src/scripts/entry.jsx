import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { uniq } from 'lodash'
import App from 'components/App'
import data from 'data/index'

ReactDOM.render(
  <App
    teams={data.teams}
    leagues={data.leagues}
    colors={data.colors}
    threshold={40}
    initialColor={'hex'}
  />,
  document.getElementById('content')
)
