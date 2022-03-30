const sql = require("./../../../config/db.js");

const userLogs = function (user_logs) {
    this.id = user_logs.id;
    this.user_id = user_logs.user_id;
    this.device_id = user_logs.device_id;
    this.device_name = user_logs.device_name;
    this.device_type = user_logs.device_type;
    this.status = user_logs.status;
    this.last_login = user_logs.last_login;
    this.device_registered_on = user_logs.device_registered_on;
};

userLogs.create = async (query_builder, result) => {

    const qb = await sql.get_connection();
    try {
        const insert_data = await qb.returning('id').insert('user_logs', query_builder.data)
        return ({ "status": 200, "response": "Device added successfully", "info": insert_data });
    } catch (err) {
        if (err) {
            return ({ "status": 400, "response": "Bad request", "msg": err });
        }
    } finally {
        qb.release();
    }
}

module.exports = userLogs;