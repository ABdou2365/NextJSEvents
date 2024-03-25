import { connectDataBase, insertDocument } from "../../helpers/db-util";

async function handler(req, res) {
    if (req.method === 'POST') {
        const emailEntred = req.body.email

        if (!emailEntred || !emailEntred.includes('@')) {
            res.status(411).json({message : "this is not a valid email"});
            return;
        }

        let client;

        try {
            client = await connectDataBase();
        } catch (error) {
            res.status(500).json({ message: 'connection to the database failed' })
            return;
        }

        try {
            await insertDocument(client,'emails', {email : emailEntred});
            client.close();
        } catch (error) {
            res.status(500).json({ message: 'insertion into the database failed' })
            return;
        }

        res.status(201).json({email : emailEntred});
    }
}

export default handler;
