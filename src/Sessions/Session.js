import React from 'react'
import { AuthContext } from '../AuthContext'

export default class Manuscript extends React.Component {
    static contextType = AuthContext
    async componentWillUnmount() {
        const db = this.context.db;
        let {words, startingWordCount, started, openTime, startTypeTime} = this.props.values;
        let session = {
            _id:"Session:"+openTime.getTime(),
            words: words,
            startingWordCount: startingWordCount,
            started: started,
            startTypeTime: startTypeTime
        }
        await db.createSession(session)
    }
    render() {
        let {currentWordCount, startingWordCount, started, openTime, startTypeTime} = this.props.values;
        let startTimeString = ''
        if(startTypeTime !== undefined) {
            startTimeString = startTypeTime.toString()
        }
        return  (
        <div>
            <p>Session</p>
            <p>Starting word count: { startingWordCount }</p>
            <p>Current word count: { currentWordCount }</p>
            <p>Begun typing: {started.toString()}</p>
            <p>Open time: {openTime.toString()}</p>
            <p>Start time: {startTimeString}</p>
        </div>)
    }
  
}


