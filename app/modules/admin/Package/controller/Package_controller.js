var util = require('util');
const services = require('../services/Package_services');


/*...........return Package..............*/


exports.getpackage = async (req,res)=>{
    try{
        const data = await services.getpackage_services(req,res);
      
       res.status(200).json(data);
    }
    catch(err){
        res.status(500).send({
            status:false,
            message:err.message
        })
    }
}

/*........end..........*/

/*.........adding package..........*/

exports.create_package = async(req,res)=>{
    try{
        const data = await services.createpackage_services(req,res);
        res.status(200).send(data);
    }
    catch(err){
        res.staus(500).json({
            status:false,
            message:err.message
        });
    }
}

/*............end of package...........*/

/*.................start of get one package................*/

exports.getonePackage = async (req,res)=>{
    try{
        const data = await services.getonepackage_services(req,res);
        res.status(200).send(data);
    }
    catch(err){
        res.status(500).send({
            status:false,
            message:err.message
        });
    }
}
