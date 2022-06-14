var connection = require('../../../../config/db.config').connection;

var util = require('util');
const queries = require('../Queries/queries')


exports.getclass = async (req,res)=>{
    try{
        const result = await queries.getadminusers_queries(req,res)
        return res.satus(200).send(result)
    }
    catch(err){
       return res.status(500).send({
            message:err.message})
    }
}

exports.addclass = async (req,res)=>{
   try{
                   const data =   await queries.createclass_queries(req,res)
                   return res.status(200).send(data)
              

        }
  
catch(err){
    res.status(500).send({
        message:err.message})
}
}