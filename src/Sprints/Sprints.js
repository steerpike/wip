import React from 'react'
import { AuthContext } from '../AuthContext'
import moment from 'moment';

export default class Sprints extends React.Component {
  static contextType = AuthContext
  state = {
    sprints: {}
  }
  async componentDidMount() {
    const db = this.context.db;
    this._isMounted = true;
    if(this._isMounted) {
      const sprints = await db.getAllSprints()
      this._isMounted && this.setState({
        sprints
      })
    }
  }
  
  render() {
    const sprints = Object.values(this.state.sprints)
    return (<div>
      <h2>Recent Sprints</h2>
      <table className="w-full border">
        <tbody>
        <tr className="border-b">
          <td>Date</td>
          <td>Document</td>
          <td>Goal</td>
          <td>Words completed</td>
          <td>Sprint finished?</td>
        </tr>
      { sprints.map((s)=>(
          <tr key={s._id}>
          <td>{moment(s.startTime).calendar()}</td>
          <td>{s.documentSlug}</td>
          <td>{s.targetGoal}</td>
          <td>{s.currentWordCount - s.startingWordCount}</td>
          <td>{s.completed?'Completed':'Incomplete'}</td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
  )
  }
}