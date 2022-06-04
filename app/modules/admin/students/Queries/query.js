var connection = require('../../../../config/db.config').connection;
var util = require('util');


exports.getstudent_queries = async (req,res)=>{
    try{
    const query = util.promisify(connection.query).bind(connection);
    const data = await query('SELECT CONCAT(FirstName," ",LastName) AS Name ,Email,PhoneNumber as Phone FROM student')
     if(data.length>0){
         return res.status(200).json({
             status:true,
             message:' data of student',
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



 exports.createstudent_queries = async(req,res)=>{
   
          
    try{
        let FirstName = req.body.FirstName;
        let LastName = req.body.LastName;
        let AddressLine1= req.body.AddressLine1;
        let AddressLine2 = req.body.AddressLine2;
        let CityorCountry = req.body.CityorCountry;
        let Zip_Code = req.body.Zip_Code;
        let PhoneNumber = req.body.PhoneNumber;
        let Email = req.body.Email;
        let Email_Verification_status = req.body.Email_Verification_status;
        let Qualification = req.body.Qualification
        let Verification_status = req.body.Verification_status
        let Login_id = req.body.Login_id
        let Password = req.body.Password
        let profilephoto = req.body.profilephoto
        let Id_proof_front = req.body.Id_proof_front
        let Id_proof_back =  req.body.Id_proof_back

        const qr = `INSERT INTO student(FirstName,LastName,AddressLine1,AddressLine2,CityorCountry,Zip_Code,PhoneNumber,Email,Email_Verification_status,Qualification,Verification_status,Login_id,Password,profilephoto,Id_proof_front,Id_proof_back) values('${FirstName}','${LastName}','${AddressLine1}','${AddressLine2}','${CityorCountry}','${Zip_Code}','${PhoneNumber}','${Email}','${Email_Verification_status}','${Qualification}','${Verification_status}','${Login_id}','${Password}','${profilephoto}','${Id_proof_front}','${Id_proof_back}')`
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
      
    
        let FirstName = req.body.FirstName;
        let LastName = req.body.LastName;
        let AddressLine1= req.body.AddressLine1;
        let AddressLine2 = req.body.AddressLine2;
        let CityorCountry = req.body.CityorCountry;
        let Zip_Code = req.body.Zip_code;
        let PhoneNumber = req.body.PhoneNumber;
        let Email = req.body.Email;
        let Email_Verification_status = req.body.Email_Verification_status;
        let Qualification = req.body.Qualification
        let Verification_status = req.body.Verification_status
        let Login_id = req.body.Login_id
        let Password = req.body.Password
        let profilephoto = req.body.profilephoto
        let Id_proof_front = req.body.Id_proof_front
        let Id_proof_back =  req.body.Id_proof_back

        const update = 'UPDATE student SET FirstName = ?,LastName =?,AddressLine1 =?,AddressLine2 =?,CityorCountry =?,Zip_Code =?,PhoneNumber =?,Email =?,Email_Verification_status = ?,Qualification =?,Verification_status =?,Login_id =?,Password =?,profilephoto =?,Id_proof_front =? Id_proof_back =? WHERE id = ?';

        const query = util.promisify(connection.query).bind(connection)
        
        await query(update,[FirstName,LastName,AddressLine1,AddressLine2,CityorCountry,Zip_Code,PhoneNumber,Email,Email_Verification_status,Qualification,Verification_status,Login_id,Password,profilephoto,Id_proof_front,Id_proof_back,id],(err,row)=>{
          
          
            if(err){
                return res.status(404).send({
                    status:false,
                    err: err
                })
              }

            else{
                return res.status(200).send({
                    status:true,
                    message:"updated the student details " 
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
    const result = await query(`select * from student where student_id = '${req.params.id}'`)
   
    if(result.length>0){

    await query(`DELETE FROM student WHERE student_id = '${req.params.id}'`,[id],(err,row)=>{
        if(row){
            return res.status(200).send({
                status:true,
                message:"deleted the student deatils" 
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
 
            const list =  await query(`SELECT * FROM student WHERE  student_id= '${req.params.id}'`)
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
        
        return res.status(500).send({
            message: error.message||"Internal Server Error"
        });
    }
    finally {
        console.log("entering and leaving the finally block");
        await util.promisify(connection.end).bind(connection);
    }
 }
