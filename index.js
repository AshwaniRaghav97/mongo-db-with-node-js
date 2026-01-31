import express from 'express';
import { MongoClient,ObjectId } from 'mongodb';
const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());
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
    app.post("/add-student-api",async(req,res)=>{
        console.log(req.body);
        const {name,age,email} = req.body;
        if(!name || !age || !email){
            res.send({"message":"invalid data",success:false});
            return false;
        }
        const collection = db.collection('student');
        const result = await collection.insertOne(req.body);
        res.send({"message":result,"operation":"success" ,success:true});
    });
    app.delete("/del/:id",async(req,res)=>{
        console.log(req.params.id);
        const collection = db.collection('student');
        const result = await collection.deleteOne({_id:new ObjectId(req.params.id)});
        if(result){
            res.send({message:"deleted successfully",success:true});
        }
        else{
            res.send({message:"deletion failed",success:false});
        }
        
    })

    app.get("/del/:id",async(req,res)=>{
        console.log(req.params.id);
        const collection = db.collection('student');
        const result = await collection.deleteOne({_id:new ObjectId(req.params.id)});
        if(result){
            res.send(`<h1>deleted successfully</h1><a href="/">Go Back</a>`);
        }
        else{
            res.send(`<h1>Not deleted</h1>`);
        }
        
    })
})



app.listen(3000);
