import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthContext } from './AuthContext'
import Header from './Header';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute'
import Manuscripts from './Manuscripts/Manuscripts';
import Manuscript from './Manuscripts/Manuscript';
import NewManuscript from './Manuscripts/NewManuscript';
import Document from './Documents/Document'

export default class App extends React.Component {
  static contextType = AuthContext
                                                                                                     
  async componentDidMount() {
    
  }
  handleSave = async (manuscript) => {
    //let getSlug = require('speakingurl');
    const db = this.context.db;
    manuscript.createdAt = new Date().getTime()
    manuscript.updatedAt = new Date().getTime()
    let slug = manuscript.createdAt
    manuscript.slug = slug
    manuscript.user = this.context.user.username;
    manuscript['_id'] = "Manuscript:"+slug
    await db.createManuscript(manuscript)
    return slug;
  }
  render() {
    const isMenuOpen = false;
    return (
      
      <div>
          <Router>
          <Header isMenuOpen={isMenuOpen} />
          <div className="container mx-auto bg-gray-100">
            <Switch>
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/manuscripts/new" component={(props) => <NewManuscript {...props} onSave={this.handleSave } />} />
              <ProtectedRoute path="/manuscripts/:slug" component={(props) => <Manuscript {...props} />}  />
              <ProtectedRoute path="/documents/:slug" component={(props) => <Document {...props} />}  />
              <ProtectedRoute path="/manuscripts" component= {(props) => <Manuscripts {...props} />} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/" component={Dashboard} />
            </Switch>
          </div>
          </Router>

      </div>
  
    );
  } 
}


