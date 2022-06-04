
const Service = require('../services/Batch.services')




exports.get_batch = async ( req,res)=>{
        try{
            const data = await Service.getall_batch(req,res);
            res.status(200).send(data)
        
        }
        catch(err){
         res.status(400).send({
                 status: false, 
                 message: err
            });
    } 
}
exports.create_batch = async (req,res)=>{
        try{
           
         const data = await Service.add_batch(req,res);
         res.status(200).send(data)
        }
        catch(err){
            res.status(500).json({
                message:err

            })
        }
}

exports.delete_Batch= async (req,res)=>{
    try{
        const data = await Service.delete_batch(req,res);
        res.status(200).send(data)
       }
       catch(err){
           res.status(500).json({
               status:false,
               message:err.message

           })
       }
}

exports.update_Batch = async (req,res)=>{
  try{
    const data = await Service.update_batch(req,res);
        res.status(200).send(data)
  }
  catch(err){
  res.status(500).json({
        status:false,
        message:err.message
    })
  }
}

exports.getOne_batch = async (req, res) => {
    try {
       const data = await Service.getone(req,res);
     res.status(200).send(data)
       }
catch(err){
    res.status(500).json({
        status:false,
        message:err.message
    })
}
}