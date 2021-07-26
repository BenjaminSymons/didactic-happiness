import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAppContext } from '../libs/contextLib'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { userHasAuthenticated } = useAppContext()
  console.log(userHasAuthenticated)
  return (
    <Route
      {...rest}
      render={(props) =>
        userHasAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
