import {Route, Redirect, Switch} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import JobsRoute from './components/JobsRoute'
import HomeRoute from './components/HomeRoute'
import JobItemDetailsRoute from './components/JobItemDetailsRoute'
import NotFound from './components/NotFound'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={HomeRoute} />
      <ProtectedRoute exact path="/jobs" component={JobsRoute} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetailsRoute} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
