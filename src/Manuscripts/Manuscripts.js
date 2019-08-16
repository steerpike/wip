import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Manuscripts extends Component {
    
    render() {
        const manuscripts = Object.values(this.props.manuscripts)
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