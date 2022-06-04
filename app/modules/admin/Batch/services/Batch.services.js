var connection = require('../../../../config/db.config').connection;

var util = require('util');
const queries = require('../Queries/batch_query')


exports.getall_batch = async (req,res)=>{
const result = await queries.getbatch_queries(req,res)
return result
}

exports.add_batch= async (req,res)=>{
   try{
                   const data =   await queries.createbatch_queries(req,res)
                   return res.status(200).send(data)
               }     

catch(err){
    res.status(500).send({
        message:err.message})
}
}

exports.delete_batch = async (req,res)=>{
    try{
        const data = await queries.delete_query(req,res)
        return res.status(200).send(data)
     }
     catch(err){
        return res.status(500).send({
            message:err.message
        })
     }
}

exports.update = async (req,res)=>{
    try{
            const data = await queries.update_query(req,res)
            return res.status(200).send(data)                           
        }    
                    
    catch(err){
       return res.status(500).send({
           message:err
       })
    }
 }

exports.getone = async(req,res)=>{
  try{
      const data = await queries.getone_query(req,res)
      return res.status(200).send(data)
  }
  catch(err){
      return res.status(500).send({
          message:err.message
      })
  }
}