var util = require('util');
const { connection } = require('../../../../config/db.config');
const adminservice = require('../services/adminusers.services')




exports.getallclass = async ( req,res)=>{
        try{
            const data = await adminservice.getclass(req,res);
            res.status(200).send(data)
        
        }
        catch(err){
          res.status(400).send({
                 status: false, 
                 message: err
            });
    } 
}
exports.creatclass = async (req,res)=>{
        try{
          
         const data = await adminservice.addclass(req,res);
         res.status(200).send(data)
        }
        catch(err){
           return res.status(500).json({
                message:err.message

            })
        }
}