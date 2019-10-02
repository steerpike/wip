import React from 'react'
import { AuthContext } from '../AuthContext'
import moment from 'moment';

export default class Sessions extends React.Component {
  static contextType = AuthContext
  state = {
    sessions: {}
  }
  async componentDidMount() {
    const db = this.context.db;
    this._isMounted = true;
    if(this._isMounted) {
      const sessions = await db.getAllSessions()
      this._isMounted && this.setState({
        sessions
      })
    }
  }
  
  render() {
    const sessions = Object.values(this.state.sessions)
    return (
      <div>
        <h2>Recent Sessions</h2>
        <table className="w-full border">
          <tbody>
        <tr className="border-b">
          <td>Opened</td>
          <td>Document</td>
          <td>Began typing</td>
          <td>Finished</td>
          <td>Time</td>
          <td>Total words</td>
        </tr>
        { sessions.map((s)=>(
          <tr key={s._id}>
          <td>{moment(s.opened).calendar()}</td>
          <td>{s.documentSlug}</td>
          <td>{moment(s.startTypeTime).format('h:mm:ss')}</td>
          <td>{moment(s.finished).format('h:mm:ss')}</td>
          <td>{parseInt(moment.duration(moment(s.finished).diff(moment(s.startTypeTime))).asMinutes())}</td>
          <td>{s.currentWordCount - s.startingWordCount}</td>
          </tr>
        ))}
        </tbody>
        </table>
      </div>
  )
  }
}