import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'

import Layout from './containers/layout'
import SchemaEditor from './containers/schema-editor'

render((
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <Route path="/:uuid/:token/schema" component={SchemaEditor}/>
    </Route>
  </Router>
), document.getElementById('app'))
