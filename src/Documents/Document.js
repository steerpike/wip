import React from 'react';
import { AuthContext } from '../AuthContext'

export default class Document extends React.Component {
    static contextType = AuthContext
    state = {
        document: {}
    }
    async componentDidMount() {
        const db = this.context.db;
        let slug = this.props.match.params.slug
        this._isMounted = true;
        if(this._isMounted) {
            let document = await db.getDocument(slug)
            this._isMounted && this.setState({
                document
            })
        }
    }
    render() {
        const { document } = this.state
        if(!document) { return null;}
        return (
            <div>
                <h4>{document.createdAt}</h4>
                <input type="text" name="title" onChange={this.updateValue} />
                <textarea type="text" name="content" value={document.content} onChange={this.updateValue} />
            </div>
        )
    }
}