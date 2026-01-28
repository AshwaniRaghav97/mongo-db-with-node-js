import express from 'express';
import { MongoClient } from 'mongodb';
const app = express();
app.set('view engine','ejs');

const dbName = "school";
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);
client.connect().then((connection)=>{
    const db = connection.db(dbName);

    app.get("/api",async(req,res)=>{
        const collection = db.collection('student');
        const stu = await collection.find().toArray();
        res.send(stu);
    })

    app.get("/ui",async(req,res)=>{
        const collection = db.collection('student');
        const student = await collection.find().toArray();
        res.render('student',{student});
    })
})



app.listen(3000);
