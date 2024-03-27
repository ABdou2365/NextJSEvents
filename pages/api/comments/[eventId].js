import { connectDataBase, getComments, insertDocument } from "../../../helpers/db-util";

async function handler(req, res) {
    const eventId = req.query.eventId 

    if (req.method === 'POST') {
        const { email, name, text } = req.body
        //console.log(email, name, text);
        if (!email.includes('@') || !name || !name.trim() || !text || !text.trim()) {
            res.status(422).json({ message: "Invalid data" });
            return;
        }               
        
        const newComment = {
            email,
            name, 
            text,
            eventId
        }

        let client;

        try {
            client = await connectDataBase()
        } catch (error) {
            res.status(500).json({ message: "connection to the databse failed" });
            return;
        }

        let result;

        try {
            result = await insertDocument(client,'comments',newComment)
        } catch (error) {
            client.close();
            res.status(500).json({ message: "connection to the databse failed" });
            return;
        }
        

        newComment.id = result.insertedId;

        res.status(201).json({message : newComment})
    }
    if (req.method === 'GET') {
        let client;

        try {
            client = await connectDataBase()
        } catch (error) {
            console.log('err')
            res.status(500).json({ message: "connection to the databse failed" });
            return;
        }

        let comments;
        try {
            comments = await getComments(client,'comments',{ _id: -1 });
        } catch (error) {
            client.close();
            res.status(500).json({ message: "retreiving data failed" });
            return;
        }
        
        client.close();
        res.status(201).json({message : comments})
    }
}

export default handler;