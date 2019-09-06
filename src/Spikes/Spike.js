import React from 'react'
import { AuthContext } from '../AuthContext'

export default class Spike extends React.Component {
    static contextType = AuthContext
    state = {
        startTime: null,
        targetGoal: 0,
        currentTargetValue: 0,
        completed: false
    }
    async componentWillUnmount() {
        this.endSpike();
    }
    saveSpike = async () => {
        const db = this.context.db;
        let {words, startingWordCount, openTime, startTypeTime} = this.props.values;
        let spike = {
            _id:"Spike:"+openTime.getTime(),
            words: words,
            startingWordCount: startingWordCount,
            startTime: this.state.startTime,
            startTypeTime: startTypeTime,
            targetGoal: this.state.targetGoal,
            currentTargetValue: this.state.currentTargetValue,
            completed: this.state.completed,
        }
        await db.createSpike(spike)
    }
    createNewSpike = async (goal) => {
        this.setState({
            startTime: new Date().getTime(),
            targetGoal: goal
        }, this.startSpike())
    }
    startSpike = () => {
        this.loadInterval = setInterval(() => {
            
            if(this.state.currentTargetValue < this.state.targetGoal*60) {
                this.setState(prevState => ({
                    currentTargetValue: (this.state.currentTargetValue + 1)
                }))
            } else {
                this.setState(prevState => ({
                    completed: true
                }), this.endSpike())
            }
        }, 1000)
    }
    endSpike = async () => {
        this.loadInterval && clearInterval(this.loadInterval);
        this.loadInterval = false;
        if(this.state.startTime != null) {
            this.setState({
                startTime: null,
                targetGoal: 0,
                currentTargetValue: 0,
                completed: false
            }, await this.saveSpike())
        }
        
    }
    render() {
        
        let {targetGoal, currentTargetValue, startTime, completed} = this.state;
        
        return  (
        <div>
            <h3>Select a writing goal</h3>
            <p>Started: {startTime}</p>
            <p>Target: {targetGoal}</p>
            <p>Current: {currentTargetValue}</p>
            <p>Completed: {completed}</p>
            <button onClick={() => this.createNewSpike(10)}>10 minutes</button>
            <button onClick={() => this.createNewSpike(20)}>20 minutes</button>
            <button onClick={() => this.createNewSpike(30)}>30 minutes</button>
            <button onClick={() => this.createNewSpike(60)}>60 minutes</button>
            <button onClick={() => this.createNewSpike(120)}>120 minutes</button>
        </div>)
    }
  
}

