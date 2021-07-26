import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import NotFound from './containers/NotFound'
import PrivateRoute from './components/PrivateRoute'
import Courses from './containers/Courses'

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/courses" component={Courses} />
      <Route exact path="/login">
        <Login />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
