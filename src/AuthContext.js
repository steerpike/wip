import React from 'react'
import DB from './Storage/db'
import firestoreDB from './Storage/firestoreDB'
import { auth } from './Storage/firebase'


const AuthContext = React.createContext()

class AuthProvider extends React.Component {
    state = {
        isAuth: true,
        isAnonymous: true,
        user: {
          username: 'Anonymous'
        },
        db: new DB('Anonymous'),
        error: null,
        sessions: {},
        sprints: {}
    }
    constructor(props) {
      super(props)
      auth.onAuthStateChanged(async function (user) { 
        let name = user?user.email:'Anonymous'
        let anonymous = user?false:true
        let database = user? new firestoreDB(name) : new DB(name)
        let sessions = await database.getAllSessions()
        let sprints = await database.getAllSprints()
        this.setState({
          ...this.state,
          isAnonymous: anonymous,
          user: {
            username: name
          },
          db:database,
          sessions:sessions,
          sprints: sprints
        })
      }.bind(this))
      //At this point we likely need to update Manuscripts, Documents, Sessions and Sprints
    }
    
    login = (name,password) => {
      auth.signInWithEmailAndPassword(name, password).catch((error) =>{
        this.setState({error: error.message})
      })    
    }
    register = (name,password) => {
      auth.createUserWithEmailAndPassword(name, password).catch((error) =>{
        this.setState({error: error.message})
      })    
    }
    logout = () => {
      auth.signOut()
    }
    syncSessions = async () => {
      let sessions = await this.state.db.getAllSessions()
      this.setState({
        sessions: sessions
      })
    }
    syncSprints = async () => {
      let sprints = await this.state.db.getAllSprints()
      this.setState({
        sprints: sprints
      })
    }
    render() { 
      return (
          <AuthContext.Provider
            value={{
              isAuth: this.state.isAuth,
              isAnonymous: this.state.isAnonymous,
              login: this.login,
              register: this.register,
              logout: this.logout,
              user: this.state.user,
              db: this.state.db,
              error: this.state.error,
              sessions: this.state.sessions,
              sprints: this.state.sprints,
              syncSessions: this.syncSessions,
              syncSprints: this.syncSprints
            }}
          >
            {this.props.children}
          </AuthContext.Provider>
        )
      }
}
const AuthConsumer = AuthContext.Consumer

export { AuthContext, AuthProvider, AuthConsumer }