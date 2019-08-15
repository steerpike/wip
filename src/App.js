import React from 'react';
import { AuthProvider } from './AuthContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header';
import Profile from './Profile';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute'

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
        <Header />
        
        <div className="container mx-auto">
          <Switch>
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </div>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
