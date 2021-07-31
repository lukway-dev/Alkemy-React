import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ContextProvider } from '../context/Context'
import Home from './Home'
import Login from './Login'

const App = () => {
  return (
    <ContextProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/login" component={Login}/>
        </Switch>
      </Router>
    </ContextProvider>
  )
}

export default App