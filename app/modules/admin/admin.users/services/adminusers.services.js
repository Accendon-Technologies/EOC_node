var connection = require('../../../../config/db.config').connection;

var util = require('util');
const queries = require('../Queries/queries')


exports.getadminusers = async (req,res)=>{
    try{
        const result = await queries.getadminusers_queries(req,res)
        return res.satus(200).send(result)
    }
    catch(err){
       return res.status(500).send({
            message:err.message})
    }
}

exports.addadminusers = async (req,res)=>{
   try{
    const query = util.promisify(connection.query).bind(connection);
    await query(`SELECT Email FROM adminusers Where Email = '${req.body.Email}'`,async (err,result)=>{
        if(result.length>0){
            return res.status(400).send({
                status:true,
                message:`${req.body.Email} already exists`
            })
            
        }
        else{
           
            await query(`select PhoneNumber from adminusers where PhoneNumber = '${req.body.PhoneNumber}'`,async (err,results)=>{
    
               if(results.length>0){
                   return res.status(400).send({
                       status:true,
                       messsage:`${req.body.PhoneNumber} already exists`
                   })
               }
               else{
                  
                   const data =   await queries.createadminusers_queries(req,res)
                   return res.status(200).send(data)
               }

           })
        }
    })
}
catch(err){
    res.status(500).send({
        message:err.message})
}
}

exports.deleteadmin = async (req,res)=>{
    try{
        const data = await queries.delete_query(req,res)
        return res.status(200).send(data)
     }
     catch(err){
        return res.status(500).send({
            message:err.message
        })
     }
}

exports.update = async (req,res)=>{
    try{
        const Id = req.query.id
       
       
        const query = util.promisify(connection.query).bind(connection);
        const email= await query(`SELECT Email,PhoneNumber FROM adminusers Where id = '${req.query.id}'`)

       const value =email[0].Email
    
       const phone_value = email[0].PhoneNumber
      
        const Email = req.body.Email
  
        const PhoneNumber = req.body.PhoneNumber

       
                   
        if(value!==Email||phone_value!==PhoneNumber){
            
            const result = await query(`SELECT Email FROM adminusers Where Email = '${req.body.Email}'`)
          
            const results = await query(`select PhoneNumber from adminusers where PhoneNumber = '${req.body.PhoneNumber}'`)
          
                if(result.length>0||results.length>0){
                   
                    const email_ID = await query(`select id from adminusers where Email = '${req.body.Email}' OR PhoneNumber = '${req.body.PhoneNumber}'`)
                    
                    const email_id = email_ID[0].id
                    
                   
                    if(email_id!=Id){
                        console.log(result)
                        return res.status(400).send({
                            status:true,
                            message:` The ${req.body.Email} email or ${req.body.PhoneNumber} phonenumber already exists`
                         })
                    }
                    else {
                        const data = await queries.update_query(req,res)
                        return res.status(200).send(data)   
                    }
                }
                else{
                    const data = await queries.update_query(req,res)
                    return res.status(200).send(data)   
                }
             
        }
                        
         else{
            const data = await queries.update_query(req,res)
            return res.status(200).send(data)                           
        }
                    
                   
    
    }                
                    
    catch(err){
       return res.status(500).send({
           message:err
       })
    }
 }

exports.getone = async(req,res)=>{
  try{
      const data = await queries.getone_query(req,res)
      return res.status(200).send(data)
  }
  catch(err){
      return res.status(500).send({
          message:err.message
      })
  }
}