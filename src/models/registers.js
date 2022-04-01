var mongoose = require('mongoose');

const accschema=new mongoose.Schema({
   accno:{
       type:Number,
       required:true
   },
   cash:{
       type:Number,
       required:true
   },
   firstname:{
       type:String,
       required:true
   },
   lastname:{
    type:String,
    required:true
   },
  email:{
    type:String,
    required:true,

  },
  gender:{
    type:String,
    required:true
  },
  phone:{
    type:Number,
    required:true,
  },

  password:{
    type:String,
    required:true
},
confirmpassword:{
    type:String,
    required:true
},
acctype:{
    type:String,
    required:true
  },
})

const Register= new mongoose.model("Register",accschema);
module.exports=Register;