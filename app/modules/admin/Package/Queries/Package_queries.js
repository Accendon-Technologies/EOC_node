var util = require('util');
const connection = require('../../../../config/db.config').connection;



/*.............get package queries.............*/


exports.getpackage_queries = async (req,res)=>{
    try{
        const query = util.promisify(connection.query).bind(connection);
        const data  = await query('SELECT Package_Title as Title,Short_Title,Color_Code,Package_fee AS Course_Fee,Old_Package_Fee AS Old_Course_Fee,Package_Duration_in_month as Course_duration,Status FROM package');
      
        if(data.length>0){
            return res.status(200).send({
                status:true,
                status_code:200,
                message:"list",
                List:data
            });
        }
        else{
            return res.status(202).send({
                status:true,
                status_code:202,
                message:"no data found",
                List:[]
            });
        }
    }
    catch(err){
        return res.status(500).send({
            status:false,
            message:err.message
        });
    }
}

/*.............end...........*/

/*..................start of create package queries............*/

exports.createpackage_queries = async(req,res)=>{
    try{

        let Exam = req.body.Exam;
        let Package_Title = req.body.Package_Title;
        let Short_Title = req.body.Short_Title;
        let Description = req.body.Description;
        let Language = req.body.Language;
        let Color_Code = req.body.Color_Code;
        let Image = req.body.Image;
        let Package_Fee = req.body.Package_Fee;
        let Old_Package_Fee = req.body.Old_Package_Fee;
        let Package_Duration_in_month = req.body.Package_Duration_in_month;
        let Package_Features = req.body.Package_Features;

        const query = util.promisify(connection.query).bind(connection);
        const insert_query = `INSERT INTO package(Exam,Package_Title,Short_Title,Description,Language,Color_Code,Image,Package_Fee,Old_Package_Fee,Package_Duration_in_month,Package_Features) VALUES ('${Exam}','${Package_Title}','${Short_Title}','${Description}','${Language}','${Color_Code}','${Image}','${Package_Fee}','${Old_Package_Fee}','${Package_Duration_in_month}','${Package_Features}')`;

        await query(insert_query,(err,result)=>{
            if(err){
                return res.status(400).send({
                    status:false,
                    message:err.message||"something went wrong"
                })

            }
            else{
                return res.status(200).send({
                    status:true,
                    message:"created the List",
                })
            }
        })
       
    }
    catch(err){
        return res.status(500).json({
            status:false,
            message:err.message
        })
    }
}


/*...........end of create package queries...............*/


/*....................getone package queries.......*/

exports.getonepackage_queries = async(req,res)=>{
    try{
        const query = util.promisify(connection.query).bind(connection);
       
        const result= await query(`SELECT * FROM package WHERE id_package = '${req.params.id}'`);
        if(result.length>0){
            return res.status(200).send({
                    status:true,
                    message:"List",
                    List:result
            })
        }
        else{
            return res.status(202).send({
                status:true,
                message:"No requested data founded",
                List:[]
            })
        }
    }
       
    catch(err){
        return res.status(500).json({
            status:false,
            message:err.message
        })
    }
}