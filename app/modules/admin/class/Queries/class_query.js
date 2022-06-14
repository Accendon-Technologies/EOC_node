var connection = require('../../../../config/db.config').connection;
var util = require('util');


exports.getclass_queries = async (req,res)=>{
    try{
    const query = util.promisify(connection.query).bind(connection);
   
    const data = await query('SELECT Title,Subtitle,Duartion,Streaming_Start_Date,Streaming_End_Date ,Class_Type FROM class')
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



 exports.createclass_queries = async(req,res)=>{
   
          
    try{
        let Exam = req.body.Exam;
   let Package= req.body.Package;
   let Subject =  req.body.Subject;
    let Chapter = req.body.Chapter;
   let Class_Type = req.body.Class_Type;
    let Class_Title = req.body.Class_Title;
    let Subtitle = req.body.Subtitle;
    let Description = req.body.Description;
    let Streaming_Start_Date = req.body.Streaming_Start_Date;
    let Streaming_End_Date = req.body.Streaming_End_Date;
    
    var hours = Math.abs(  Streaming_Start_Date - Streaming_End_Date) / 36e5
        const query = util.promisify(connection.query).bind(connection)
    const qr = `INSERT INTO class(Exam,Package,Subject,Chapter,Class_Type,Class_Title,Subtitle,Description,Streaming_Start_Date,Streaming_End_Date,Thumbnail,Batch) values('${Exam}','${Package}','${Subject}','${Chapter}','${Class_Type}','${Class_Title}','${Subtitle}','${Description}','${Streaming_Start_Date}','${Streaming_End_Date}')`
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