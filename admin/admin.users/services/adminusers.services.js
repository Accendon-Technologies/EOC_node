var connection = require('../../../../config/db.config').connection;
var util = require('util');



exports.getadminusers = async (req,res)=>{
 try{
    
     const query = util.promisify(connection.query).bind(connection);
   const data = await query('SELECT FirstName,LastName,Email,PhoneNumber as Phone,status FROM adminusers')
    if(data.length>0){
        return res.status(200).json({
            status:true,
            message:'Successfully get data of admin-users',
            data: data
        });
    }
    
     else{
        return res.status(202).send({
            status:false,
            message:"no data founded"
        })
        }
        
 }
 catch(err){
    return res.status(500).json({
        status:false,
        message:err.message||'Internal server Error'})
 }
}

exports.addadminusers = async (req,res)=>{
    try{
        let FirstName = req.body.FirstName;
        let LastName = req.body.LastName;
        let Email = req.body.Email;
        let PhoneNumber = req.body.PhoneNumber;
        let Username = req.body.Username;
        let UserType = req.body.UserType;
        let Password = req.body.Password;
        let Subject = req.body.Subject;
        let AboutInstructor = req.body.AboutInstructor;
         {
            const query = util.promisify(connection.query).bind(connection)
            
            const qr = `INSERT INTO adminusers(FirstName,LastName,Email,PhoneNumber,Username,Password,UserType,Subject,AboutInstructor) values('${FirstName}','${LastName}','${Email}','${PhoneNumber}','${Username}','${Password}','${UserType}','${Subject}','${AboutInstructor}') `
            await query(qr,(err,result)=>{
               
                if(err){
                if(err.sqlMessage==`Duplicate entry '${Email}' for key 'Email_UNIQUE'`){
                    return res.status(400).send({
                        status:false,
                        message:"Email already exist"
                    })
                }
               else if(err.sqlMessage==`Duplicate entry '${PhoneNumber}' for key 'PhoneNumber_UNIQUE'`){
        
                    return res.status(400).send({
                          status:false,
                          message:"phonenumber already exist"
                      })
          
                  }
                  else {
                      
                    return res.status(404).send({
                        status:false,
                        message:err||"somethhing went wrong"
                    })
                  }
                }
            else{
               return res.status(200).json({
                    status:true,
                    message:"successfully added  data ",
                    
                })
            }
         })
        }
    }
    
    catch(err){
     return res.status(400).send({
          status:false,
          message:"Data not entered"
      })
    }
}

exports.deleteadmin = async (req,res)=>{
    try{
        const query = util.promisify(connection.query).bind(connection)
        const id = req.params.id
        await query('DELETE FROM adminusers WHERE id = ?',[id],(err,row)=>{
            if(err){

              return res.status(404).send({
                    status:false,
                    message:"something went wrong while deleting."
                })
            }
            else{
              
                return res.status(200).send({
                    status:true,
                    message:"deleted the adminuser successfully" 
                })
            }
        })
    }
    catch(err){
        return res.status(500).send({
            status:false,
            message:err.message
        })
    }
}


exports.update = async (req,res)=>{
    try{ 
        const id = req.params.id
        let FirstName = req.body.FirstName;
        let LastName = req.body.LastName;
        let Email = req.body.Email;
        let PhoneNumber = req.body.PhoneNumber;
        let Username = req.body.Username;
        let UserType = req.body.UserType;
        let Password = req.body.Password;
        let Subject = req.body.Subject;
        let AboutInstructor = req.body.AboutInstructor;
    
    
        const update = 'UPDATE adminusers SET FirstName = ?,LastName =?,Email =?,PhoneNumber =?,Username = ?,UserType =?,Password =?,Subject =?,AboutInstructor =? WHERE id = ?';
    
        const query = util.promisify(connection.query).bind(connection)
    
        await query(update,[FirstName,LastName,Email,PhoneNumber,Username,UserType,Password,Subject,AboutInstructor,id],(err,row)=>{
            if(err){
              if(err.sqlMessage==`Duplicate entry '${Email}' for key 'Email_UNIQUE'`){
                return res.status(400).send({
                    status:false,
                    message:"Email already exist"
                })
            }
           else if(err.sqlMessage==`Duplicate entry '${PhoneNumber}' for key 'PhoneNumber_UNIQUE'`){
    
                return res.status(400).send({
                      status:false,
                      message:"phonenumber already exist"
                  })
      
              }
             else  {
                  
                return res.status(404).send({
                    status:false,
                    err: err
                })
              }
            }
            else{
              
                return res.status(200).send({
                    status:true,
                    message:"updated the adminuser successfully" 
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

exports.getone = async(req,res)=>{
    try{
    const query = util.promisify(connection.query).bind(connection);
    let id = req.params.id
        const list =  await query(`SELECT * FROM adminusers WHERE status=1 AND id= id`)
  if(list.length>0){
      return res.status(200).send({
          status:true,
          message:"succesfully got",
          data: list
      })
  }
  else{
      return res.status(202).send({
          status:true,
          message:"no data have found",
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
finally {
    console.log("entering and leaving the finally block");
    await util.promisify(connection.end).bind(connection);
}
}