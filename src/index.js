import React from 'react'
import { render } from 'react-dom'
import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import Layout from './containers/layout'
import SchemaEditor from './containers/schema-editor'
import SearchDevice from './containers/search-device'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={SearchDevice}/>
      <Route path="/:uuid" component={SchemaEditor}/>
    </Route>
  </Router>
), document.getElementById('app'))
