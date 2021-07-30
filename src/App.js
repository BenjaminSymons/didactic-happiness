import './App.css'
import Navbar from './components/Navbar'
import Routes from './Routes'
import React, { useEffect, useState } from 'react'
import { AppContext } from './libs/contextLib'
import { Auth } from 'aws-amplify'
import { useHistory } from 'react-router-dom'
import { onError } from './libs/errorLib'

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(true)
  const history = useHistory()

  useEffect(() => {
    onLoad()
  }, [])

  async function onLoad() {
    try {
      await Auth.currentSession()
      userHasAuthenticated(true)
    } catch (e) {
      if (e !== 'No current user') {
        onError(e)
      } else {
        history.push('/login')
      }
    }

    setIsAuthenticating(false)
  }

  return (
    !isAuthenticating && (
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <div className="flex flex-col h-screen App">
          <Routes />
        </div>
      </AppContext.Provider>
    )
  )
}

export default App
