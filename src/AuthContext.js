import React from 'react'
import DB from './Storage/db'
import PouchDB from 'pouchdb'
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
        error: null
    }
    constructor(props) {
      super(props)
      auth.onAuthStateChanged(function (user) { 
        let name = user?user.email:'Anonymous'
        let anonymous = user?false:true
        this.setState({
          ...this.state,
          isAnonymous: anonymous,
          user: {
            username: name
          },
          db:new DB(name)
        }, () => {
          /*let remoteRB = new PouchDB('http://hallofbrightcarvings.com.au:5984/test')
          let info = remoteRB.info()
          console.log(info)
          this.state.db.sync(remoteRB)
          console.log('syncing', remoteRB)*/
        })
      }.bind(this))
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
              error: this.state.error
            }}
          >
            {this.props.children}
          </AuthContext.Provider>
        )
      }
}
const AuthConsumer = AuthContext.Consumer

export { AuthContext, AuthProvider, AuthConsumer }