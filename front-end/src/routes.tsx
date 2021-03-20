import React from 'react'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm'
import Cart from './components/cart'
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
    <Route exact path="/cart">
      <Cart />
    </Route>
  </Switch>
)

export default withRouter(Routes)
