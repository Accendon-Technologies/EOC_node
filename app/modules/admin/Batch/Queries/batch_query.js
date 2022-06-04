var connection = require('../../../../config/db.config').connection;
var util = require('util');


exports.getbatch_queries = async (req,res)=>{
    try{
    const query = util.promisify(connection.query).bind(connection);
    const data = await query('SELECT Package,Title,Date,Description FROM batch')
     if(data.length>0){
         return res.status(200).json({
             status:true,
             message:' data ',
             data: data
         });
     }
     
      else{
         return res.status(202).send({
             status:false,
             message:"no data founded",
             data : []
         })
         }
        }    
  
  catch(err){
     return res.status(500).json({
         status:false,
         message:err.message||'Internal server Error'})
  }
 }



 exports.createbatch_queries = async(req,res)=>{
   
          
    try{
        let Package = req.body.Package;
        let Title = req.body.Title;
        let Date = req.body.Date;
        let Start_Date = req.body.Start_Date;
        let End_Date = req.body.End_Date;
        let Description = req.body.Description

        
        
        const qr = `INSERT INTO batch(Package,Title,Date,Start_Date,End_Date,Description) values('${Package}','${Title}}','${Date}','${Start_Date}','${End_Date}','${Description}')`
        const query = util.promisify(connection.query).bind(connection)
   
        await query(qr,(err,result)=>{
       
        if(err){
      
            return res.status(404).send({
                status:false,
                message:err.message||"something went wrong"
            })
          }
        
        else{
       

       return res.status(200).json({
            status:true,
            message:"added data of adminusers",
           
        })
         }
         })
    }


catch(err){
return res.status(400).send({
  status:false,
  message:err.message||"Data not entered"
})
}
 }


 exports.update_query = async(req,res)=>{
    try{ 
        let Package = req.body.Package;
        let Title = req.body.Title;
        let Date = req.body.Date;
        let Start_Date = req.body.Start_Date;
        let End_Date = req.body.End_Date;
        let Description = req.body.Description
    
        
        const update = 'UPDATE batch SET Package = ?,Title =?,Date =?,Start_Date =?,End_Date =?,Description =? WHERE id = ?';

        const query = util.promisify(connection.query).bind(connection)
        
        await query(update,[Package,Title,Date,Start_Date,End_Date,Description,id],(err,row)=>{
          
          
            if(err){
                return res.status(404).send({
                    status:false,
                    err: err
                })
              }

            else{
                return res.status(200).send({
                    status:true,
                    message:"updated the  details " 
                })
            }
        })
    }
    catch(err){
        return res.status(500).send({
            status:false,
            message:'internal server error'
        })
    
    }
 }
 

 exports.delete_query = async(req,res)=>{
 try{
    const query = util.promisify(connection.query).bind(connection)
    const id = req.params.id
    const result = await query(`select * from batch where batch_id = '${req.params.id}'`)
   
    if(result.length>0){

    await query(`DELETE FROM batch WHERE batch_id = '${req.params.id}'`,[id],(err,row)=>{
        if(row){
            return res.status(200).send({
                status:true,
                message:"deleted the  deatils" 
            })
           
        }
        else{
            return res.status(202).send({
                status:true,
                message:"no data",
                data : []
            })
        }
    })
}
else{
    return res.status(400).send({
        status:true,
        message:"no requested id found"
    })
}
}
 catch(err){
    return res.status(500).send({
        status:false,
        message:err
    })
  }
}



 exports.getone_query = async (req,res)=>{
    try{
        const query = util.promisify(connection.query).bind(connection);
 
            const list =  await query(`SELECT * FROM batch WHERE  batch_id = '${req.params.id}'`)
            console.log(list)
      if(list.length>0){
          console.log(list.length)
          return res.status(200).send({
              status:true,
              message:"list",
              data: list
          })
      }
      else{
          return res.status(202).send({
              status:true,
              message:"no data ",
              data:[]
          })
      }
    } 
    catch (error) {
        
        return res.status(500).send({
            message: error.message||"Internal Server Error"
        });
    }
    finally {
        console.log("entering and leaving the finally block");
        await util.promisify(connection.end).bind(connection);
    }
 }
