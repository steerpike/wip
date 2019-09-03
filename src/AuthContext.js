import React from 'react'
import DB from './Storage/db'


const AuthContext = React.createContext()

class AuthProvider extends React.Component {
    state = {
        isAuth: true,
        isAnonymous: true,
        user: {
          username: 'Anonymous'
        },
        db: new DB('anonymous'),
        manuscripts: {}
    }
    getManuscripts = async () => {
      const manuscripts = await this.state.db.getAllManuscripts()
      this.setState({
        manuscripts
      })
    }
    
    addManuscript = async (manuscript) => {
      const response = await this.state.db.createManuscript(manuscript)
      console.log('response',response)
      this.getManuscripts()
     
    }
    login = (name,password) => {
        //setTimeout(() => this.setState({ isAuth: true }), 1000)
        this.setState({
          ...this.state,
          isAuth: true,
          isAnonymous: false,
          user: {
            username: name
          },
          db:new DB(name)
        })
        
    }
    logout = () => {
        this.setState({ isAuth: true, 
          isAnonymous: true,
          user: {
            username: 'Anonymous'
          } 
        })
    }
    render() { 
      return (
          <AuthContext.Provider
            value={{
              isAuth: this.state.isAuth,
              isAnonymous: this.state.isAnonymous,
              login: this.login,
              logout: this.logout,
              updateManuscripts: this.updateManuscripts,
              addManuscript: this.addManuscript,
              user: this.state.user,
              db: this.state.db,
              manuscripts: this.state.manuscripts,
            }}
          >
            {this.props.children}
          </AuthContext.Provider>
        )
      }
}
const AuthConsumer = AuthContext.Consumer

export { AuthContext, AuthProvider, AuthConsumer }