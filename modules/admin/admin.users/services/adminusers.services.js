var connection = require('../../../../config/db.config').connection;
const e = require('express');
var util = require('util');
const queries = require('../Queries/queries')


exports.getadminusers = async (req,res)=>{
const result = await queries.getadminusers_queries(req,res)
return result
}

exports.addadminusers = async (req,res)=>{
   try{
    const query = util.promisify(connection.query).bind(connection);
    await query(`SELECT Email FROM adminusers Where Email = '${req.body.Email}'`,async (err,result)=>{
        if(result.length>0){
            return res.status(400).send({
                status:true,
                message:`${req.body.Email} already exists`
            })
            
        }
        else{
           
            await query(`select PhoneNumber from adminusers where PhoneNumber = '${req.body.PhoneNumber}'`,async (err,results)=>{
    
               if(results.length>0){
                   return res.status(400).send({
                       status:true,
                       messsage:`${req.body.PhoneNumber} already exists`
                   })
               }
               else{
                  
                   const data =   await queries.createadminusers_queries(req,res)
                   return res.status(200).send(data)
               }

           })
        }
    })
}
catch(err){
    res.status(500).send({
        message:err.message})
}
}

exports.deleteadmin = async (req,res)=>{
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
           message:err.message
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