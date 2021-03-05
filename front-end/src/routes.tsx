import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm'
import Landing from './components/landing'
import Products from './components/products'
import SingleProduct from './components/singleProduct'

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/">
      <Landing />
    </Route>
    <Route path="/auth/login">
      <Login />
    </Route>
    <Route path="/auth/signup">
      <Signup />
    </Route>
    <Route exact path="/products/">
      <Products />
    </Route>
    <Route path="/products/category/">
      <Products />
    </Route>
    <Route exact path="/products/:productId">
      <SingleProduct />
    </Route>
  </Switch>
)

export default Routes
