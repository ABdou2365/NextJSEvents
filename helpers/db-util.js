import { MongoClient } from "mongodb";

export async function connectDataBase() {
    const client = await MongoClient.connect('mongodb+srv://abdomoutawakkil2002:RJtuE2ubSGSe8vck@cluster0.lhg4new.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    return client;
}

export async function insertDocument(client ,collection, document) {
    const db = client.db();
    const result = await db.collection(collection).insertOne(document)
    return result;
}

export async function getComments(client,collection,sort) {
    const db = client.db()
    const commentCollection = db.collection(collection);
    const comments = await commentCollection.find({}).sort(sort).toArray();
    return comments;
}