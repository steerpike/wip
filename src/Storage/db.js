import PouchDb from 'pouchdb'

export default class DB {
    constructor(name) {
        this.db = new PouchDb(name)
    }
    async getAllManuscripts() {
        let allItems = await this.db.allDocs({startkey: "Manuscript:", endkey: "Manuscript:\ufff0",include_docs: true});
        let manuscripts = {};
        allItems.rows.forEach(i => manuscripts[i.id] = i.doc);
        return manuscripts;
    }
    async createManuscript(manuscript) {
        const res = await this.db.post({...manuscript})
        return res
    }
    async getManuscript(slug) {
        const item = await this.db.allDocs({startkey: "Manuscript:"+slug,include_docs: true, limit:1});
        let manuscript = {}
        if(item && item.rows && item.rows.length>=1) {
           manuscript = item.rows[0].doc
        }
        return manuscript;
    }
    async getAllDocumentsForManuscript(manuscript) {
        let allDocuments = await this.db.allDocs({startkey:"Document:"+manuscript.slug, endkey: "Document:"+manuscript.slug+"\ufff0", include_docs: true});
        let docs = [];
        allDocuments.rows.forEach(i => docs.push(i.doc));
        return docs;
    }
    async createDocumentForManuscript(document) {
        const res = await this.db.post({...document})
        return res
    }
    async getDocument(slug) {
        const item = await this.db.allDocs({startkey: "Document:"+slug,include_docs: true, limit:1});
        let document = {}
        document = item.rows[0].doc
        return document;
    }
}