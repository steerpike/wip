import React from 'react'
import { AuthContext } from '../AuthContext'

export default class Sprint extends React.Component {
    static contextType = AuthContext
    _isMounted = false;
    state = {
        startTime: null,
        targetGoal: 0,
        currentTargetValue: 0,
        completed: false
    }
    componentDidMount() {
        this._isMounted = true;
    }
    async componentWillUnmount() {
        this._isMounted = false;
        this.endSprint();
    }
    saveSprint = async (sprint) => {
        const db = this.context.db;
        
        await db.createSprint(sprint)
    }
    createNewSprint = async (goal) => {
        this.setState({
            startTime: new Date(),
            targetGoal: goal
        }, this.startSprint())
    }
    startSprint = () => {
        this.loadInterval = setInterval(() => {
            
            if(this.state.currentTargetValue < this.state.targetGoal*60) {
                this.setState(prevState => ({
                    currentTargetValue: (this.state.currentTargetValue + 1)
                }))
            } else {
                this.setState(prevState => ({
                    completed: true
                }), () => this.endSprint())
            }
        }, 1000)
    }
    endSprint = async () => {
        this.loadInterval && clearInterval(this.loadInterval);
        this.loadInterval = false;
        if(this.state.startTime != null) {
            let { startingWordCount, openTime, startTypeTime, document, currentWordCount } = this.props.values;
            if(startTypeTime === undefined) {
                startTypeTime = this.state.startTime
            }
            if(currentWordCount === 0) {
                currentWordCount = startingWordCount
            }
            let sprint = {
                _id: "Sprint:" + openTime.getTime(),
                user: this.context.user.username,
                currentWordCount: currentWordCount,
                startingWordCount: startingWordCount,
                documentId: document._id,
                documentSlug: document.slug,
                startTime: this.state.startTime,
                startTypeTime: startTypeTime,
                targetGoal: this.state.targetGoal,
                currentTargetValue: this.state.currentTargetValue,
                completed: this.state.completed,
            }
            await this.saveSprint(sprint)
            this.context.syncSprints()
            if (this._isMounted) {
                this.setState({
                    startTime: null,
                    targetGoal: 0,
                    currentTargetValue: 0,
                    completed: false
                })
            }
        }
        
    }
    render() {
        
        return  (
        <div className="max-w-2xl mx-auto">
            <button className="mx-1 rounded-full h-20 w-20 items-center justify-center" onClick={() => this.createNewSprint(1)}>1<br /> minute</button>
            <button className="mx-1 rounded-full h-20 w-20 items-center justify-center" onClick={() => this.createNewSprint(10)}>10 minutes</button>
            <button className="mx-1 rounded-full h-20 w-20 items-center justify-center" onClick={() => this.createNewSprint(20)}>20 minutes</button>
            <button className="mx-1 rounded-full h-20 w-20 items-center justify-center" onClick={() => this.createNewSprint(30)}>30 minutes</button>
            <button className="mx-1 rounded-full h-20 w-20 items-center justify-center" onClick={() => this.createNewSprint(60)}>60 minutes</button>
            <button className="mx-1 rounded-full h-20 w-20 items-center justify-center" onClick={() => this.createNewSprint(120)}>120 minutes</button>
        </div>)
    }
  
}

