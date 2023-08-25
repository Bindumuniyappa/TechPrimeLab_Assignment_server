const mongoose=require("mongoose")

const projectSchema=mongoose.Schema({
    theme:{type:String,required:true},
    reason:{type:String,required:true},
    type:{type:String,required:true},
    division:{type:String,required:true},
    category:{type:String,required:true},
    priority:{type:String,required:true},
    department:{type:String,required:true},
    start_date:{type:String,required:true},
    end_date:{type:String,required:true},
    location:{type:String,required:true},
    status:{type:String,required:true}
},{
    versionKey: false,
  })

const Project=mongoose.model("project",projectSchema)
module.exports={Project};