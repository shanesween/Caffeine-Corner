import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Landing from './components/landing'
import Products from './components/products'

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <Landing />
    </Route>
    <Route path="/products/">
      <Products />
    </Route>
  </Switch>
)

export default Routes
