var util = require('util');
const { connection } = require('../../../../config/db.config');
const adminservice = require('../services/Batch.services')




exports.get_batch = async ( req,res)=>{
        try{
            const data = await adminservice.getBatch(req,res);
            res.status(200).send(data)
        
        }
        catch(err){
         res.status(400).send({
                 status: false, 
                 message: err
            });
    } 
}
exports.create_Batch = async (req,res)=>{
        try{
            console.log(req.file)
         const data = await adminservice.add_batch(req,res);
         res.status(200).send(data)
        }
        catch(err){
            res.status(500).json({
                message:err

            })
        }
}

exports.delete_Batch = async (req,res)=>{
    try{
        const data = await adminservice.remove_batch(req,res);
        res.status(200).send(data)
       }
       catch(err){
           res.status(500).json({
               status:false,
               message:err.message

           })
       }
}

//add students to Batch

exports.add_student_batch = async(req,res)=>{
    try{
        const query = util.promisify(connection.query).bind(connection);
      
        
       const concta =  await query("SELECT CONCAT(FirstName,' ',LastName)AS Name FROM student")
       
       const insert = 'INSERT IGNORE INTO Batch SELECT FROM student'
          ;
       console.log(concta)
    }
    catch(err){
        res.status(500).json({
            status:false,
            message:err.message

        })
    }
}

// exports.updateadminusers = async (req,res)=>{
//   try{
//     const data = await adminservice.update(req,res);
//         res.status(200).send(data)
//   }
//   catch(err){
//     res.status(500).json({
//         status:false,
//         message:err.message
//     })
//   }
// }

// exports.getoneadminusers = async (req, res) => {
//     try {
//        const data = await adminservice.getone(req,res);
//      return res.status(200).send(data)
//        }
// catch(err){
//     res.status(500).json({
//         status:false,
//         message:err.message
//     })
// }
// }