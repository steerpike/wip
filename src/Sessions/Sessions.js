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
        { sessions.map((s)=>(
          <div key={s._id}>
          Opened: {moment(s.opened).calendar()} 
          Began typing: {moment(s.startTypeTime).format('h:mm:ss')} 
          Finished: {moment(s.finished).format('h:mm:ss')} 
          Time: {parseInt(moment.duration(moment(s.finished).diff(moment(s.startTypeTime))).asMinutes())}
          Written words: {s.currentWordCount - s.startingWordCount}
          </div>
        ))}
      </div>
  )
  }
}