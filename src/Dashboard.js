import React from 'react'
import Sessions from './Sessions/Sessions'
import Sprints from './Sprints/Sprints'

const Dashboard = (props) => {

  return (
    <div>
      <h1>Dashboard</h1>
      <Sessions />
      <Sprints />
    </div>
  )
}


export default Dashboard