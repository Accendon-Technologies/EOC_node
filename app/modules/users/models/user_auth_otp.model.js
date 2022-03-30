const sql = require("./../../../config/db.js");

const UserAuthOtp = function (user_auth_otp) {
    this.id = user_auth_otp.id;
    this.user_id = user_auth_otp.user_id;
    this.otp = user_auth_otp.otp;
    this.verified = user_auth_otp.verified;
    this.expired_at = user_auth_otp.expired_at;
    this.device_id = user_auth_otp.device_id;
    this.status = user_auth_otp.status;
    this.created_at = user_auth_otp.created_at;
};


UserAuthOtp.getOne = async (query_builder, result) => {

    const qb = await sql.get_connection();
    try {
        // console.log("-------query_builder---------- :", query_builder)
        const result_data = await qb.select(query_builder.columns)
            .where(query_builder.where)
            .order_by(['id desc'])
            .get('user_auth_otp');

        // console.log("--------result_d------ :", result_data)


        if (result_data.length) {

            return (null, result_data[0]);

        }

        return ({ kind: "Error retrieving fetching result" }, null);

    } catch (err) {
        if (err) {

            return (null, err);
        }
    } finally {
        qb.release();
    }
}

UserAuthOtp.create = async (query_builder, result) => {

    const qb = await sql.get_connection();
    try {
        // const insert_data = await qb.insert('user_auth_otp', query_builder.data, (err, res) => {

        const insert_data = await qb.returning('id').insert('user_auth_otp', query_builder.data)
        return ({ "status": 200, "response": insert_data });



    } catch (err) {
        if (err) {

            return (null, err);
        }
    } finally {
        qb.release();
    }

}

UserAuthOtp.update = async (query_builder) => {
    const qb = await sql.get_connection();
    try {

        const update_data = await qb.update('user_auth_otp', query_builder.data, query_builder.where)
        return update_data

    } catch (err) {
        if (err) {

            return ({ kind: err }, null);
        }
    } finally {
        qb.release();
    }
}

// UserAuthOtp.updateAndCreate = (query_builder, result) => {
//     (async (result) => {
//         const qb = await sql.get_connection();
//         try {

//             const update_data = await qb.update('user_auth', { status: 0 }, query_builder.where, (err, res) => {

//                 if (err) return result({ kind: err }, null);

//                 const data = {
//                     user_id: query_builder.data.user_id,
//                     device_id: query_builder.data.device_id,
//                     device_name: query_builder.data.device_name,
//                     device_type: query_builder.data.device_type,
//                     status: query_builder.data.device_status,
//                     device_registered_on: query_builder.data.device_registered_on
//                 }
//                 const insert_data = qb.insert('user_auth', data, (err, res) => {

//                     if (err) return result({ kind: err }, null);
//                     const auth_query_builder = {
//                         columns: ['user_id', 'last_login'],
//                         where: { id: res.insert_id }
//                     }
//                     UserAuth.getOne(auth_query_builder, (err, res2) => {
//                         //resolve(result)
//                         result(null, { status: 1, id: res.insert_id, last_login: res2.last_login.toISOString().replace(/T/, ' ').replace(/\..+/, ''), user_id: res2.user_id });
//                         return;

//                     })


//                 });


//             });


//         } catch (err) {
//             if (err) {
//                 result(null, err);
//                 return;
//             }
//         } finally {
//             qb.release();
//         }
//     })(result)

// }


module.exports = UserAuthOtp;