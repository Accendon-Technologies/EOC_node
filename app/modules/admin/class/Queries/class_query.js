var connection = require('../../../../config/db.config').connection;
var util = require('util');


exports.getadminusers_queries = async (req,res)=>{
    try{
    const query = util.promisify(connection.query).bind(connection);
    const data = await query('SELECT FirstName,LastName,Email,PhoneNumber as Phone,status,profilephoto FROM classes')
    console.log(data)
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
    const qr = `INSERT INTO classes(FirstName,LastName,Email,PhoneNumber,Username,Password,UserType,Subject,AboutInstructor,profilephoto) values('${FirstName}','${LastName}','${Email}','${PhoneNumber}','${Username}','${Password}','${UserType}','${Subject}','${AboutInstructor}','${profilephoto}')`
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