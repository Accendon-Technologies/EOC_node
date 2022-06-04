var util = require('util');
const { connection } = require('../../../../config/db.config');
const adminservice = require('../services/adminusers.services')




exports.getalladminusers = async ( req,res)=>{
        try{
            const data = await adminservice.getadminusers(req,res);
            res.status(200).send(data)
        
        }
        catch(err){
         return res.status(400).send({
                 status: false, 
                 message: err
            });
    } 
}
exports.createnewadminusers = async (req,res)=>{
        try{
          
         const data = await adminservice.addadminusers(req,res);
         res.status(200).send(data)
        }
        catch(err){
           return res.status(500).json({
                message:err.message

            })
        }
}

exports.deleteadminusers = async (req,res)=>{
    try{
        const data = await adminservice.deleteadmin(req,res);
        res.status(200).send(data)
       }
       catch(err){
           res.status(500).json({
               status:false,
               message:err.message

           })
       }
}

exports.updateadminusers = async (req,res)=>{
  try{
    const data = await adminservice.update(req,res);
       return res.status(200).send(data)
  }
  catch(err){
   return res.status(500).json({
        status:false,
        message:err.message
    })
  }
}

exports.getoneadminusers = async (req, res) => {
    try {
       const data = await adminservice.getone(req,res);
     return res.status(200).send(data)
       }
catch(err){
    res.status(500).json({
        status:false,
        message:err.message
    })
}
}

