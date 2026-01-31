import express from 'express';
import { MongoClient } from 'mongodb';
const app = express();
app.use(express.urlencoded({extended:true}));
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

    app.get("/",async(req,res)=>{
        const collection = db.collection('student');
        const student = await collection.find().toArray();
        res.render('student',{student});
    })

    app.get("/add",(req,res)=>{
        res.render('form');
    })

    app.post("/addstudent",async(req,res)=>{
        // console.log(req.body);
        const collection = db.collection('student');
        const result = await collection.insertOne(req.body);
        console.log(result);
        res.send("data saved");
    })
})



app.listen(3000);
