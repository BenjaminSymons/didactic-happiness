import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './containers/Home'
import Login from './containers/Login'
import NotFound from './containers/NotFound'
import PrivateRoute from './components/PrivateRoute'
import Courses from './containers/Courses'
import Course from './containers/Course'
import Admin from './containers/Admin'

export default function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/" component={Home} />
      <PrivateRoute exact path="/courses" component={Courses} />
      <PrivateRoute exact path="/courses/:id" component={Course} />
      <PrivateRoute exact path="/admin" component={Admin} />
      <Route exact path="/login">
        <Login />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  )
}
