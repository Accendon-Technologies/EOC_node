var util = require('util');
const connection = require('../../../../config/db.config')
const queries = require('../Queries/Package_queries');


/*.....getpackage services................*/

exports.getpackage_services = async (req,res)=>{
    try{
       
        const data = await queries.getpackage_queries(req,res);
        
       return res.satus(200).json(data);
    }
    catch(err){
        return res.status(500).json({
            status:false,
            message:err.message
        });
    }
}

/*..............end of get package services .............*/

/*.............start of create package services ..................*/

exports.createpackage_services = async (req,res)=>{
    try{
       
        const data = await queries.createpackage_queries(req,res);
        
       return res.satus(200).json(data);
    }
    catch(err){
        return res.status(500).json({
            status:false,
            message:err.message
        });
    }
}

/*...........end............*/

/*..............start of getone package services..........*/

exports.getonepackage_services = async(req,res)=>{
    try{
        const data = await queries.getonepackage_queries(req,res);
        
        return res.satus(200).json(data);
    }
    catch(err){
        return res.status(500).json({
            status:false,
            message:err.message
        });
    }
}