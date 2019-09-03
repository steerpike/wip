import React from 'react';
import { AuthContext } from '../AuthContext'
import { Link } from 'react-router-dom'

export default class Manuscript extends React.Component {
    static contextType = AuthContext
    state = {
        manuscript: {},
        documents: []
    }
    constructor(props) {
        super(props);
    
        this._isMounted = false;
    }
    async componentDidMount() {
        const db = this.context.db;
        let slug = this.props.match.params.slug
        this._isMounted = true;
        if(this._isMounted) {
            let manuscript = await db.getManuscript(slug)
            this._isMounted && this.setState({
                manuscript
            })
            let documents = await db.getAllDocumentsForManuscript(manuscript)
            this._isMounted && this.setState({
                documents
            })
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
     }
    createNewDocument = async () => {
        const db = this.context.db;
        let next = this.state.documents.length + 1
        let createdAt = new Date().getTime()
        let slug = this.state.manuscript.slug+':'+createdAt
        let id = 'Document:'+slug
        let document = {
            _id: id,
            slug: slug,
            order: next,
            title: 'Chapter '+next,
            content: '',
            createdAt: createdAt,
            updatedAt: new Date().getTime(),
        }
        await db.createDocumentForManuscript(document)
        let documents = await db.getAllDocumentsForManuscript(this.state.manuscript)
            this._isMounted && this.setState({
                documents
            })
    }
    render() {
        const { manuscript, documents } = this.state;
        if(!manuscript) { return null;}
        return (
            <div>
                <div>
                    <h2>{manuscript.title}</h2>
                    <p>{manuscript.content}</p>
                </div>
                {documents && 
                 documents.map((d)=>(
                    <div key={d._id}>
                    <Link to={`/documents/${d.slug}`}>{d.title} </Link>
                </div>
                    ))
                }
                <button 
                data-test="createNewDocumentButton"
                onClick={this.createNewDocument}>Add new document</button>
            </div>
        )
    }
}