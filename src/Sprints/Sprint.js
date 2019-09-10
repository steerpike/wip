import React from 'react'
import { AuthContext } from '../AuthContext'

export default class Sprint extends React.Component {
    static contextType = AuthContext
    state = {
        startTime: null,
        targetGoal: 0,
        currentTargetValue: 0,
        completed: false
    }
    async componentWillUnmount() {
        this.endSprint();
    }
    saveSprint = async () => {
        const db = this.context.db;
        let {words, startingWordCount, openTime, startTypeTime} = this.props.values;
        let sprint = {
            _id:"Sprint:"+openTime.getTime(),
            words: words,
            startingWordCount: startingWordCount,
            startTime: this.state.startTime,
            startTypeTime: startTypeTime,
            targetGoal: this.state.targetGoal,
            currentTargetValue: this.state.currentTargetValue,
            completed: this.state.completed,
        }
        await db.createSprint(sprint)
    }
    createNewSprint = async (goal) => {
        this.setState({
            startTime: new Date().getTime(),
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
            this.setState({
                startTime: null,
                targetGoal: 0,
                currentTargetValue: 0,
                completed: false
            }, await this.saveSprint())
        }
        
    }
    render() {
        
        let {targetGoal, currentTargetValue, startTime, completed} = this.state;
        
        return  (
        <div>
            <h3>Current Sprint</h3>
            <p>Started: {startTime}</p>
            <p>Target: {targetGoal}</p>
            <p>Current: {currentTargetValue}</p>
            <p>Completed: {completed}</p>
            <button onClick={() => this.createNewSprint(1)}>1 minute</button>
            <button onClick={() => this.createNewSprint(10)}>10 minutes</button>
            <button onClick={() => this.createNewSprint(20)}>20 minutes</button>
            <button onClick={() => this.createNewSprint(30)}>30 minutes</button>
            <button onClick={() => this.createNewSprint(60)}>60 minutes</button>
            <button onClick={() => this.createNewSprint(120)}>120 minutes</button>
        </div>)
    }
  
}
