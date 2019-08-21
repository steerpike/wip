import PouchDb from 'pouchdb'

export default class DB {
    constructor(name) {
        this.db = new PouchDb(name)
    }
    async getAll() {
        let allItems = await this.db.allDocs({include_docs: true});
        let manuscripts = {};
        allItems.rows.forEach(i => manuscripts[i.id] = i.doc);
        return manuscripts;
    }
    async createManuscript(manuscript) {
        const res = await this.db.post({...manuscript})
        console.log('db',res)
        return res
    }
}