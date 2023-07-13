const express = require('express');
const { auth } = require('../middleware/auth.middleware');
const { employeeModel } = require('../model/employee.model');
const employeeRouter = express.Router();

employeeRouter.use(auth)

//     firstName : String,
//     lastName : String,
//     email : String,
//     department : String,
//     salary : Number

employeeRouter.post("/add",async(req,res)=>{
    const userID = req.body.userID;
    try {
        const { firstName, lastName, email, department,salary } = req.body;
        const post = new employeeModel({
          firstName,
          email,
          lastName,
          department,
          salary,
          userID : userID
        });
        await post.save();
        res.json({ message: 'Post created successfully' });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred' });
      }
})

employeeRouter.get('/', async (req, res) => {
    try {
      const { page = 1, limit = 5 } = req.query;
      const employees = await employeeModel.find().limit(limit).skip((page - 1) * limit);
      res.json({ employees });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  })

  employeeRouter.get('/filter',async (req, res) => {
    try {
      const { page = 1, limit = 5, department  } = req.query;
      
      const employee = await employeeModel.find({department})
        .skip((page - 1) * limit)
        .limit(limit);
      res.json({ employee });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  employeeRouter.get('/top', async (req, res) => {
    try {
      const { page = 1, limit = 5 } = req.query;
      const employees = await employeeModel.find()
        .sort('salary:-1')
        .skip((page - 1) * limit)
        .limit(limit);
      res.json({ employees });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  employeeRouter.get('/bottom', async (req, res) => {
    try {
      const { page = 1, limit = 5 } = req.query;
      const employees = await employeeModel.find()
        .sort('salary')
        .skip((page - 1) * limit)
        .limit(limit);
      res.json({ employees });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });

  employeeRouter.patch("/update/:employeeId",async(req,res)=>{

    const employeeID = req.params.employeeId; 
    try {
        const post = await employeeModel.findByIdAndUpdate({_id: employeeID},req.body);
        res.json({msg:"updated successfully",employee:req.body})
    } catch (error) {
        res.json({error:error})
    }
    
})

employeeRouter.delete("/delete/:employeeID",async(req,res)=>{
    const employeeID = req.params.employeeID;
    try {
        await employeeModel.findByIdAndDelete({_id: employeeID});
        res.json({msg:"deleted successfully"})
        
    } catch (error) {
        res.json({error:error})
    }
})

module.exports = {
    employeeRouter
}