import express from "express";
let app = express();

let router = express.Router();



router.use((req,res,next)=>{
    console.log('Time:', Date.now());
    next();
})


router.use('/user/:id',(req,res,next)=>{
    console.log("route", req.method);
    next();
},(req,res,next)=>{
  console.log("method", req.method);
  next();
}
)

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
