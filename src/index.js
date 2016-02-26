import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Layout from './containers/layout'
import SchemaEditor from './containers/schema-editor'
import SearchDevice from './containers/search-device'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <Route path="/search" component={SearchDevice}/>
      <Route path="/:uuid/schema" component={SchemaEditor}/>
    </Route>
  </Router>
), document.getElementById('app'))
