import React from 'react';
import { AuthContext } from '../AuthContext'
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css'; 

export default class Document extends React.Component {
    static contextType = AuthContext
    state = {
        document: { 
            title: '', 
            content: '' 
        }
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
    updateTitle = (event) => {
        let newTitle = event.target.value
        this.setState(prevState => ({document: {
            ...prevState.document,
            title:newTitle
        }}));
    }
    updateContent = (content) => {
        let newContent = content
        this.setState(prevState => ({document: {
            ...prevState.document,
            content:newContent
        }}));
    }
    render() {
        const { document } = this.state
        if(!document) { return null;}
        return (
            <div>
                <h4>{document.createdAt}</h4>
                <input type="text" name="title" defaultValue={document.title} onChange={this.updateTitle} />
                <ReactQuill
                    className="min-h-screen border reactQuill"
                    theme="bubble"
                    value={document.content}
                    onChange={this.updateContent}
                />
            </div>
        )
    }
}