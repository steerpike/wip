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
            this.context.syncSessions()
        }
        
    }
    render() {
 
        return  (
        <div>
        </div>)
    }
  
}


