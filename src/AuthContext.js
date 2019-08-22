import React from 'react'
import DB from './Storage/db'


const AuthContext = React.createContext()

class AuthProvider extends React.Component {
    state = {
        isAuth: true,
        user: {
          username: 'brightcarvings'
        },
        db: new DB('brightcarvings'),
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
      /*this.setState({
        manuscripts: {
          ...this.state.manuscripts,
          [manuscript.slug]:manuscript
        }
      })*/
    }
    login = (name,password) => {
        setTimeout(() => this.setState({ isAuth: true }), 1000)
        this.setState({
          ...this.state,
          user: {
            username:'brightcarvings'
          },
          db:new DB('brightcarvings')
        }, () => this.getManuscripts())
        
    }
    logout = () => {
        this.setState({ isAuth: false })
    }
    render() { 
      return (
          <AuthContext.Provider
            value={{
              isAuth: this.state.isAuth,
              login: this.login,
              logout: this.logout,
              updateManuscripts: this.updateManuscripts,
              addManuscript: this.addManuscript,
              user: this.state.user,
              db: this.state.db,
              manuscripts: this.state.manuscripts
            }}
          >
            {this.props.children}
          </AuthContext.Provider>
        )
      }
}
const AuthConsumer = AuthContext.Consumer

export { AuthContext, AuthProvider, AuthConsumer }