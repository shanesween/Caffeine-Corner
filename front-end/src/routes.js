import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import Landing from './Components/landing.tsx'

const Routes = () => (
  <Switch>
    <Route exact path="/">
      <Landing />
    </Route>
  </Switch>
)

export default Routes
