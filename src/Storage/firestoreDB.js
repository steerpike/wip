import {firestore} from './firebase'

export default class firestoreDB {
    constructor(name) {
        this.db = firestore
        this.name = name
    }
    async getAllManuscripts() {
        let manuscripts = {};
        await this.db.collection("manuscripts").where("user", "==", this.name).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                manuscripts[doc.id] = doc.data()
            })
        })
        return manuscripts;
    }
    async createManuscript(manuscript) {
        const res = await this.db.collection("manuscripts").doc().set({
            ...manuscript
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        return res
    }
    async getManuscript(slug) {
        let manuscript = {}
        await this.db.collection("manuscripts").where("slug", "==", parseInt(slug)).limit(1).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                manuscript = doc.data();
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        return manuscript;
    }
    async getAllDocumentsForManuscript(manuscript) {
        let docs = [];
        await this.db.collection("documents").where("_id", ">=", "Document:"+manuscript.slug)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                docs.push(doc.data())
            })
        })
        return docs;
    }
    async createDocumentForManuscript(document) {
        const res = await this.db.collection("documents").doc(document._id).set({
            ...document
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        return res
    }
    async updateDocumentForManuscript(document) {
        const res = await this.db.collection("documents").doc(document._id).set({
            ...document
        }, { merge: true })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        return res
    }
    async getDocument(slug) {
        let document = {}
        await this.db.collection("documents").where("slug", "==", slug).limit(1).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                document = doc.data();
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
        return document;
    }
    async createSession(session) {
        const res = await this.db.collection("sessions").doc(session._id).set({
            ...session
        })
        .then(function() {
            console.log("Session successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing session: ", error);
        });
        return res
    }
    async createSprint(sprint) {
        const res = await this.db.collection("sprints").doc(sprint._id).set({
            ...sprint
        })
        .then(function() {
            console.log("Sprint successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing sprint: ", error);
        });
        return res
    }
    async getAllSessions() {
        let sessions = {};
        await this.db.collection("sessions").where("user", "==", this.name).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                sessions[doc.id] = doc.data()
                //normalise firestore dates to the same as pouchdb
                sessions[doc.id].opened = sessions[doc.id].opened.toDate()
                sessions[doc.id].startTypeTime = sessions[doc.id].startTypeTime.toDate()
                sessions[doc.id].finished = sessions[doc.id].finished.toDate()
            })
        })
        return sessions;
    }
    async getAllSprints() {
        let sprints = {};
        await this.db.collection("sprints").where("user", "==", this.name).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                sprints[doc.id] = doc.data()
                sprints[doc.id].startTime = sprints[doc.id].startTime.toDate()
            })
        })
        return sprints;
    }
}