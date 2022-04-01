const express = require('express');
const path=require('path');
const hbs = require('hbs');
const app = express();
require("../db/conn");
const Register=require("./registers");
// const { prependOnceListener } = require('process');
// const Logger = require('nodemon/lib/utils/log');
// const { use } = require('express/lib/application');
const localhost=process.env.PORT || 3000;
const static_path = path.join(__dirname,"../../public");  
const templates_path=path.join(__dirname,"../../templates/views");  
const partials_path=path.join(__dirname,"../../templates/partials");  
const curr=path.join(__dirname); 
console.log(curr);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set("views",templates_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
  res.render("index");
})
app.get("/register",(req,res)=>{
   res.render('register');
})
app.get("/register/*",(req,res)=>{
   res.render('register');
})
let amount=0;
app.post("/register", async (req,res)=>{
  try{
     const password=req.body.password;
     const cpassword=req.body.confirmpassword;
     if(password===cpassword){
      let accno = Math.floor(10000000 + Math.random() * 9000);
        const registeracc=new Register({
           firstname:req.body.firstname,
           lastname:req.body.lastnames,
           cash:amount,
           accno:accno,
           email:req.body.email,
           phone:req.body.PhoneNo,
           gender:req.body.Gender,
           acctype:req.body.Typeofacc,
           password:req.body.password,
           confirmpassword:req.body.confirmpassword
        })
        const register=await registeracc.save();
        res.status(400).render("login");
      //   console.log(register.firstname);
     }
     else{
        res.send("password not matching");
     }
     
  }
  catch(err){
     res.status(400).send(err);
  }
})


app.get("/aboutus",(req,res)=>{
   res.render("aboutus");
})

app.get("/login",(req,res)=>{
   res.render("login");
})
app.get("/aboutus/*",(req,res)=>{
   res.render("aboutus");
})
app.get("/contactus",(req,res)=>{
   res.render('contactus');
})
app.get("/contactus/*",(req,res)=>{
   res.render('contactus');
})
// app.get("*",(req,res)=>{
//    res.send('error');
// })
//problem
var user;
app.post("/login",async (req,res)=>{
   try{
    accnos=req.body.accnos;
     const password=req.body.password;
     const user=await Register.findOne({accno:accnos})
     if(user.password===password){

         // Updating value in mongo
         // const filter = {accno: user.accno}
         // const updateDoc = {
         //    $set: {
         //       cash: user.cash + 1
         //    },
         // }
         // const options = {upsert: true}
         // awaitc Register.updateOne(filter, updateDoc, options);

         res.render("fetchs", {accNo: accnos});
     }
    
   }
   catch(err){
      res.status(400).send("inavlid");
   }
})


// app.get("/calamount",async (req,res)=>{
//    console.log(req)
//    accountNo = req.body.accountNo
//    const user=await Register.findOne({accno:accountNo})
//    console.log(user.cash)
//    return user.cash
// })

//For fetch page cash
const DummyTry=()=>{
   return `This is working`;
}

app.listen(localhost,()=>{
    console.log(`Server is running at port no ${localhost}`)
});



