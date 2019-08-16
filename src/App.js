import React from 'react';
import { AuthProvider } from './AuthContext'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './Header';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute'
import Manuscripts from './Manuscripts/Manuscripts';
import Manuscript from './Manuscripts/Manuscript';
import NewManuscript from './Manuscripts/NewManuscript';

export default class App extends React.Component {
  state = {
    manuscripts: {
        "podcast-work:1565919435": {
            _id: "Manuscript:podcast-work:1565919435",
            slug: "podcast-work:1565919435",
            title: "Podcast Work",
            content: "A podcast series on couch to 80K words",
            createdAt: new Date(),
            updatedAt: new Date()
        },
        "the-good-thief:1565919577": {
            _id: "Manuscript:the-good-thief:1565919577",
            slug: "the-good-thief:1565919577",
            title: "The good thief",
            content: "A novel on being the immortal thief crucified with Jesus.",
            createdAt: new Date(),
            updatedAt: new Date()
        }
    }
  }


  handleSave = (manuscript) => {
    let getSlug = require('speakingurl');
    manuscript.createdAt = new Date().getTime()
    manuscript.updatedAt = new Date().getTime()
    let slug = getSlug(manuscript.title)+":"+manuscript.createdAt
    manuscript.slug = slug
    manuscript['_id'] = "Manuscript:"+slug
    const {manuscripts} = this.state
    this.setState({
      manuscripts: {
        ...manuscripts,
        [slug]:manuscript
      }
    })
    return slug;
  }
  render() {
    return (
      <div>
        <AuthProvider>
          <Router>
          <Header />
          
          <div className="container mx-auto">
            <Switch>
              <Route path="/login" component={Login} />
              <ProtectedRoute path="/manuscripts/new" component={(props) => <NewManuscript {...props} onSave={this.handleSave } />} />
              <ProtectedRoute path="/manuscripts/:slug" component={(props) => <Manuscript {...props} manuscript={this.state.manuscripts[props.match.params.slug]} />}  />
              <ProtectedRoute path="/manuscripts" component= {(props) => <Manuscripts {...props} manuscripts={this.state.manuscripts} />} />
              <ProtectedRoute path="/profile" component={Profile} />
              <ProtectedRoute path="/" component={Dashboard} />
            </Switch>
          </div>
          </Router>
        </AuthProvider>
      </div>
    );
  } 
}


