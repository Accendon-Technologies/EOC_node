var connection = require('../../../../config/db.config').connection;
var util = require('util');


exports.getadminusers_queries = async (req,res)=>{
    try{
    const query = util.promisify(connection.query).bind(connection);
    const data = await query('SELECT FirstName,LastName,Email,PhoneNumber as Phone FROM adminusers')

     if(data.length>0){
         return res.status(200).json({
             status:true,
             message:' data of admin-users',
             data: data
         });
     }
     
      else{
         return res.status(202).json({
             status:true,
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



 exports.createadminusers_queries = async(req,res)=>{
   
          
    try{
        let FirstName = req.body.FirstName;
   let LastName = req.body.LastName;
   let Email  =  req.body.Email;
    let PhoneNumber = req.body.PhoneNumber;
   let Username = req.body.Username;
    let UserType = req.body.UserType;
    let Password = req.body.Password;
    let Subject = req.body.Subject;
    let AboutInstructor = req.body.AboutInstructor;
    let profilephoto = req.body.profilephoto;

        const query = util.promisify(connection.query).bind(connection)
    const qr = `INSERT INTO adminusers(FirstName,LastName,Email,PhoneNumber,Username,Password,UserType,Subject,AboutInstructor,profilephoto) values('${FirstName}','${LastName}','${Email}','${PhoneNumber}','${Username}','${Password}','${UserType}','${Subject}','${AboutInstructor}','${profilephoto}')`
    await query(qr,(err,result)=>{
       
        if(err){
      
              console.log(err)
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
        const id = req.query.id
        let FirstName = req.body.FirstName;
        let LastName = req.body.LastName;
        let Email = req.body.Email;
        let PhoneNumber = req.body.PhoneNumber;
        let Username = req.body.Username;
        let UserType = req.body.UserType;
        let Password = req.body.Password;
        let Subject = req.body.Subject;
        let AboutInstructor = req.body.AboutInstructor;
        let profilephoto = req.body.profilephoto;
    
        const update = 'UPDATE adminusers SET FirstName = ?,LastName =?,Email =?,PhoneNumber =?,Username = ?,UserType =?,Password =?,Subject =?,AboutInstructor =?,profilephoto =? WHERE id = ?';
    
        const query = util.promisify(connection.query).bind(connection)
        
        await query(update,[FirstName,LastName,Email,PhoneNumber,Username,UserType,Password,Subject,AboutInstructor,profilephoto,id],(err,row)=>{
          
          
            if(err){
           
                  
                return res.status(404).send({
                    status:false,
                    err: err
                })
              }

            else{
              
                return res.status(200).send({
                    status:true,
                    message:"updated the adminuser " 
                })
            }
        })
    }
    catch(err){
        return console.log({
            status:false,
            message:'internal server error'
        })
    
    }
 }
 

 exports.delete_query = async(req,res)=>{
 try{
    const query = util.promisify(connection.query).bind(connection)
    const id = req.query.id
    const result = await query(`select * from adminusers where id = '${req.query.id}'`)
   
    if(result.length>0){
    await query(`DELETE FROM adminusers WHERE id = '${req.query.id}'`,[id],(err,row)=>{
        if(row){
            return res.status(200).send({
                status:true,
                message:"deleted the adminuser" 
            })
           
        }
        
        else{
            return res.status(400).send({
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
        message:err.message
    })
  }
}



 exports.getone_query = async (req,res)=>{
    try{
        const query = util.promisify(connection.query).bind(connection);
        
    const list =  await query(`SELECT * FROM adminusers WHERE status = 1 AND id= '${ req.query.id}'`)
      if(list.length>0){
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
        console.error(error);
        return res.status(500).send({
            message: error.message||"Internal Server Error"
        });
    }
   
 }


 exports.update_status_query = async (req,res)=>{
   
    try{
        const query = util.promisify(connection.query).bind(connection);
        const result = await query(`select * from adminusers where id = '${req.query.id}'`)
    console.log(result)
    if(result.length>0){
         await query(`update adminusers set status = case when status = 1 then 0 else 1 end where id = '${req.query.id}'`,async (err,data)=>{
             if(data){
                 return res.json({
                     status:true,
                     status_code:200,
                     message:"status updated"
                 })
             }
             else{
                 return res.status(400).send({
                     status:true,
                     message:err
                 })
             }
         })
        
    }
    else{
        return res.send({
            status:true,
            status_code:400,
            message:'no data found',
            data : []
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