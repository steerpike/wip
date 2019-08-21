import React, { Component } from 'react'
import { AuthContext } from '../AuthContext'
import { Link } from 'react-router-dom'

class Manuscripts extends Component {
    static contextType = AuthContext
    render() {
        const manuscripts = Object.values(this.context.manuscripts)
        return (<div>
            <h2>Manuscripts List</h2>
            { manuscripts.map((m)=>(
                <div key={m._id}>
                    <Link to={`/manuscripts/${m.slug}`} >{m.title}</Link>
                </div>))}
                <div>
                <Link to="/manuscripts/new" key="new">New Manuscript</Link>
                </div>
        </div>)
    }
}
export default Manuscripts