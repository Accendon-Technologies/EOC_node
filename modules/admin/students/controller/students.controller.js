var util = require('util');
const { connection } = require('../../../../config/db.config');
const studentService = require('../services/students.services')




exports.get_student = async ( req,res)=>{
        try{
            const data = await studentService.getall_student(req,res);
            res.status(200).send(data)
        
        }
        catch(err){
         res.status(400).send({
                 status: false, 
                 message: err
            });
    } 
}
exports.create_student = async (req,res)=>{
        try{
            console.log(req.file)
         const data = await studentService.add_student(req,res);
         res.status(200).send(data)
        }
        catch(err){
            res.status(500).json({
                message:err

            })
        }
}

exports.delete_student= async (req,res)=>{
    try{
        const data = await studentService.delete_students(req,res);
        res.status(200).send(data)
       }
       catch(err){
           res.status(500).json({
               status:false,
               message:err.message

           })
       }
}

exports.update_student = async (req,res)=>{
  try{
    const data = await studentService.update_Student(req,res);
        res.status(200).send(data)
  }
  catch(err){
    res.status(500).json({
        status:false,
        message:err.message
    })
  }
}

exports.getOne_student = async (req, res) => {
    try {
       const data = await studentService.getone_Student(req,res);
     return res.status(200).send(data)
       }
catch(err){
    res.status(500).json({
        status:false,
        message:err.message
    })
}
}