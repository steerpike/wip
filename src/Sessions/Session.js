import React from 'react'
import { AuthContext } from '../AuthContext'

export default class Manuscript extends React.Component {
    static contextType = AuthContext
    async componentWillUnmount() {
        const db = this.context.db;
        let {currentWordCount, startingWordCount, started, openTime, startTypeTime, document} = this.props.values;
        if(started === true) {
            let session = {
                _id:"Session:"+openTime.getTime(),
                user: this.context.user.username,
                currentWordCount: currentWordCount,
                startingWordCount: startingWordCount,
                documentId: document._id,
                documentSlug: document.slug,
                opened: openTime,
                started: started,
                finished: new Date(),
                startTypeTime: startTypeTime
            }
            await db.createSession(session)
        }
        
    }
    render() {
        let {currentWordCount, startingWordCount, started, openTime, startTypeTime} = this.props.values;
        let startTimeString = ''
        if(startTypeTime !== undefined) {
            startTimeString = startTypeTime.toString()
        }
        return  (
        <div>
            <h3>Current Session</h3>
            <p>Starting word count: { startingWordCount }</p>
            <p>Current word count: { currentWordCount }</p>
            <p>Begun typing: {started.toString()}</p>
            <p>Open time: {openTime.toString()}</p>
            <p>Start time: {startTimeString}</p>
        </div>)
    }
  
}


