const express=require("express");
const { Project } = require("../models/ProjectModel");

const ProjectRoute=express.Router();


ProjectRoute.post("/createproject",async(req,res)=>{

    const {theme,reason,type,division,category,priority,department,start_date,end_date,location}=req.body; 

   try{
        const project=new Project({theme,reason,type,division,category,priority,department,start_date,end_date,location,status:"Registered"});
        await project.save();
        res.send({msg:"project registered successfully"});
    }
    catch(err){
        console.log(err);
    }
})

ProjectRoute.get("/projects",async(req,res)=>{
   let page=req.query.page
   let limit=req.query.limit
  let skipRecords=(Number(page))*10;
    try {
        const projects = await Project.find().limit(limit).skip(skipRecords-10)
        if (!projects) {
          res.send({ msg: 'project not found' });
        } else {
          res.send(projects);
        }
      } catch (err) {
        res.send({msg:"Error in finding projects"});
      }
})
ProjectRoute.put("/projects/:id",async(req,res)=>{
    const id=req.params.id;
  try {
    const project = await Project.findById(id)
    if (!project) {
      res.send({ msg: 'project not found' });
    } else {
        const {status}=req.body
       project.status= status
      await project.save();
      res.send({ msg: 'project updated successfully', project: project });
    }
  } catch (err) {
    res.send({msg:"Error in updating projects data,try again"});
  }
})

ProjectRoute.get("/projectsCounts",async(req,res)=>{
  try{
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      const day = today.getDate();
      const todayDate = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    
  let statusCount=await Project.aggregate([{$group:{_id:"$status",count:{$sum:1}}},{$sort:{_id:1}}])

  let clousercount=await Project.find({$and:[{status:"Running"},{end_date:{$lt:todayDate}}]}).count()

  let project = await Project.aggregate([
    {
      $group: {
        _id: "$department",
        total: { $sum: 1 },
        closedCount: {
          $sum: { $cond: [{ $eq: ["$status", "Closed"] }, 1, 0] },
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);
  return res.send({project:project,clousercount:clousercount,statusCount:statusCount});
  
    
  }catch(err){
    res.send({msg:"Error in finding count of data,try again"})
  }
})

module.exports={ProjectRoute};