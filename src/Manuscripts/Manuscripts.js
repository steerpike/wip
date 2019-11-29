import React, { Component } from 'react'
import { AuthContext } from '../AuthContext'
import { Link } from 'react-router-dom'

class Manuscripts extends Component {
    static contextType = AuthContext
    state = {
        manuscripts: {},
    }
    async componentDidMount() {
        const db = this.context.db;
        this._isMounted = true;
        if(this._isMounted) {
            let manuscripts = await db.getAllManuscripts()
            this._isMounted && this.setState({
                manuscripts
            })
        }
        this.context.setTitle("Manuscripts")
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        const manuscripts = Object.values(this.state.manuscripts)
        return (<div>
            { manuscripts.map((m)=>(
                <div key={m._id}>
                    <Link to={`/manuscripts/${m.slug}`} >{m.title}</Link>
                </div>))}
                <div>
                <Link 
                data-test="newManuscriptsLink"
                to="/manuscripts/new" key="new">New Manuscript</Link>
                </div>
        </div>)
    }
}
export default Manuscripts