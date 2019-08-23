import React from 'react';
import { AuthContext } from '../AuthContext'
import ReactQuill from 'react-quill';
import Session from '../Sessions/Session'

import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css'; 

export default class Document extends React.Component {
    static contextType = AuthContext
    state = {
        document: { 
            title: '', 
            content: '' 
        },
        started: false,
        openTime: new Date(),
        startTypeTime: undefined,
        currentWordCount: 0,
        currentWordMarker: 0,
        startingWordCount: 0
    }
    constructor(props) {
        super(props)
        this.quillRef = null;      // Quill instance
        this.reactQuillRef = null; // ReactQuill component
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
        this.attachQuillRefs()
        let startingWords = this.quillRef.getText()
        startingWords = startingWords.trim()
        let startingWordCount = startingWords.length > 0 ? startingWords.split(/\s+/).length : 0;
        this.setState({startingWordCount:startingWordCount, currentWordMarker:startingWordCount})
    }
    componentDidUpdate() {
        this.attachQuillRefs()
    }
    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }
    updateTitle = (event) => {
        let newTitle = event.target.value
        this.setState(prevState => ({document: {
            ...prevState.document,
            title:newTitle
        }}), () => {
            this.saveDocument()
        });
    }
    updateContent = (content) => {
        if (this.quillRef === null) return;
        //let newContent = content
        let words = this.quillRef.getText()
        //newContent = this.quillRef.getContents()
        words = words.trim()
        let wordCount = words.length > 0 ? words.split(/\s+/).length : 0;
        this.setState(prevState => ({
                document: {
                ...prevState.document,
                content:content
            },
            currentWordCount: wordCount
        }));
        if(this.state.started === false) {
            this.setState({
                started: true,
                startTypeTime: new Date()
            })
        }
        if(this.state.currentWordMarker !== wordCount) {
            this.saveDocument()
            this.setState({
                currentWordMarker: wordCount
            })
        }
        
    }
    saveDocument = async () => {
        const db = this.context.db;
        try {
        let result = await db.updateDocumentForManuscript(this.state.document)
        this.setState(prevState => ({
            document: {
            ...prevState.document,
            _rev:result.rev
        }}));
        } catch(e) {
            console.log('updating too quickly', e)
        }
    }
    render() {
        const { document } = this.state
        if(!document) { return null;}
        return (
            <div>
                <h4>{document.createdAt}</h4>
                <input type="text" name="title" defaultValue={document.title} onChange={this.updateTitle} />
                <Session values={this.state}/>
                <ReactQuill
                    ref={(el) => { this.reactQuillRef = el }}
                    className="min-h-screen border reactQuill"
                    theme="bubble"
                    value={document.content}
                    onChange={this.updateContent}
                />
            </div>
        )
    }
}