var connection = require('../../../../config/db.config').connection;
var util = require('util');




exports.getall_Student = async (req,res)=>{
 try{
    
     const query = util.promisify(connection.query).bind(connection);
   const data = await query('SELECT FirstName,LastName,Email,PhoneNumber as Phone,status,profilephoto FROM student')
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

exports.add_student= async (req,res)=>{
    try{

    //    console.log(req.file);
    //    console.log(req.body);
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
        
            const query = util.promisify(connection.query).bind(connection)
            
            const qr = `INSERT INTO student(FirstName,LastName,AddressLine1,AddressLine2,CityorCountry,Zip_Code,PhoneNumber,Email,Email_Verification_status,Qualification,Verification_status,Login_id,Password,profilephoto,Id_proof_front,Id_proof_back) values('${FirstName}','${LastName}','${AddressLine1}','${AddressLine2}','${PhoneNumber}','${CityorCountry}','${Zip_Code}',${Email}','${Email_Verification_status}','${Qualification}','${Verification_status}','${Login_id}','${Password}','${profilephoto}','${Id_proof_front}','${Id_proof_back}')`
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
    
    
    catch(err){
     return res.status(400).send({
          status:false,
          message:"Data not entered"
      })
    }
}

exports.delete_students = async (req,res)=>{
    try{
        const query = util.promisify(connection.query).bind(connection)
        const id = req.params.id
        await query('DELETE FROM student WHERE id = ?',[id],(err,row)=>{
            if(err){

              return res.status(404).send({
                    status:false,
                    message:"something went wrong while deleting."
                })
            }
            else{
              
                return res.status(200).send({
                    status:true,
                    message:"deleted the Student detials successfully" 
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


exports.update_Student = async (req,res)=>{
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
              if(err.sqlMessage==`Duplicate entry '${Email}' for key 'Email_UNIQUE'`){
                return res.status(400).send({
                    status:false,
                    message:"Email already exist"
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
                    message:"updated the student details successfully" 
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

exports.getone_Student = async(req,res)=>{
    try{
    const query = util.promisify(connection.query).bind(connection);
    let id = req.params.id
        const list =  await query(`SELECT * FROM student WHERE  id= id`)
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