const sql = require("./../../../config/db.js");
const fs = require('fs')

var Canvas = require("canvas");
global.Image = Canvas.Image;

const User = function (user) {
  this.id = user.id;
  this.email = user.email;
  this.user_name = user.user_name;
  this.password = user.password;
  this.image_id = user.image_id;
  this.location = user.location;
  this.lattitude = user.longitude;
  this.qualification = user.qualification;
  this.experience = user.experience;
  this.company_name = user.company_name;
  this.user_type = user.user_type;
  this.address_1 = user.address_1;
  this.address_2 = user.address_2;
  this.pin_code = user.pin_code;
  this.area = user.area;
  this.last_login = user.last_login;
  this.license_status = user.license_status;
  this.is_email_verified = user.is_email_verified;
  this.is_mobile_verified = user.is_mobile_verified;
  this.signup_device_id = user.signup_device_id;
  this.created_at = user.created_at;
  this.updated_at = user.updated_at;
  this.deleted_at = user.deleted_at;
  this.status = user.status;
};
User.getOne = async (query_builder, type) => {

  const qb = await sql.get_connection();
  try {
    let result_data = {}

    result_data = await qb.select(query_builder.columns)
      .from('users')
      .where(query_builder.where)
      .get()

    if (type === 'update') {
      return (null, result_data);

    } else {
      return (null, result_data[0]);

    }

  } catch (err) {
    if (err) {

      return err;
    }
  } finally {
    qb.release();
  }


}

User.update = async (query_builder) => {

  const qb = await sql.get_connection();
  try {
    const update_data = await qb.update('users', query_builder.data, query_builder.where)
    // console.log("-------update_data------- :", update_data)
    return update_data

  } catch (err) {
    if (err) {

      return ({ kind: err }, null);
    }
  } finally {
    qb.release();
  }

}

User.create = async (query_builder, result) => {

  const qb = await sql.get_connection();
  try {

    const insert_data = await qb.returning('id').insert('users', query_builder.data)
    console.log("----- insert data -------:", insert_data)
    return ({ status: 200, success_status: true, message: "userFiles added successfully", response: insert_data });

  } catch (err) {
    if (err) {

      return ({ status: 400, success_status: false, message: err });
    }
  } finally {
    qb.release();
  }
}





User.getNearByVendors = (data, result) => {
  (async (result) => {
    const qb = await sql.get_connection();
    try {
      var lattitude = data.lat;
      var longitude = data.long;
      var distance = data.distance || 10;
      var user_id = data.user_id;
      var sql_query = `
   SELECT * FROM (
   SELECT *, 
   (
       (
           (
               acos(
                   sin(( ${lattitude} * pi() / 180))
                   *
                   sin(( lattitude * pi() / 180)) + cos(( ${lattitude} * pi() /180 ))
                   *
                   cos(( lattitude * pi() / 180)) * cos((( ${longitude} - longitude) * pi()/180)))
           ) * 180/pi()
       ) * 60 * 1.1515 * 1.609344
   )
as distance FROM users
) vendor_list
WHERE distance <= ${distance} and user_type = 'vendor' and id <> ${user_id}
LIMIT 15
`;

      const result_data = await qb.query(sql_query);

      if (result_data.length) {
        result(null, result_data);
        return;

      }

      result({ kind: "Error retrieving fetching result" }, null);

    } catch (err) {
      if (err) {
        result(null, err);
        return;
      }
    } finally {
      qb.release();
    }
  })(result)

}





User.getAll = async (query_builder) => {
  const qb = await sql.get_connection();
  let result_data = {}
  let totalCount = {}
  try {
    if (query_builder.user_type || query_builder.user_name || query_builder.email || query_builder.phone_no) {
      result_data = await qb.select(query_builder.columns)
        .or_where('status', 0)
        .or_where('status', 1)
        .like('phone_no', `%${query_builder.phone_no}%`)
        .like('user_name', query_builder.user_name)
        .like('email', query_builder.email)
        .like('user_type', query_builder.user_type)
        .order_by('created_at', 'desc')
        .limit(query_builder.limit)
        .offset(query_builder.offset)
        .get('users')


      totalCount = await qb.select(query_builder.columns)
        .or_where('status', 0)
        .or_where('status', 1)
        .like('phone_no', `%${query_builder.phone_no}%`)
        .like('user_name', query_builder.user_name)
        .like('email', query_builder.email)
        .like('user_type', query_builder.user_type)
        .get('users')
    } else {
      result_data = await qb.select(query_builder.columns)
        .or_where('status', 0)
        .or_where('status', 1)
        .order_by('created_at', 'desc')
        .limit(query_builder.limit)
        .offset(query_builder.offset)
        .get('users')

      totalCount = await qb.select(query_builder.columns)
        .or_where('status', 0)
        .or_where('status', 1)
        .order_by('created_at', 'desc')
        .get('users')
    }

    if (result_data.length) {
      return ({ "status": 200, "count": totalCount.length, "response": result_data });

    } else {
      return ({ "status": 200, "count": totalCount.length, "response": "No data" });
    }
  } catch (err) {
    console.log("---- err ------- :", err)
    if (err) {
      return ({ "status": 400, "response": "Bad request", "msg": err });
    }
  } finally {
    qb.release();
  }
}

User.deleteUser = async (query_builder, result) => {
  const qb = await sql.get_connection();
  try {
    const result_data = await qb.delete('users', query_builder.where)

    if (result_data.length) {
      return result_data;
    }
  } catch (err) {
    if (err) {
      return err;
    }
  } finally {
    qb.release();
  }
}

User.getOneDetail = async (query_builder, result) => {
  const qb = await sql.get_connection();
  try {
    let result_data = {}
    let encode_image = ''
    if (query_builder.type === 'profile') {

      // let userDetails = await qb.select(query_builder.columns).where(query_builder.where).get('users');
      // console.log("----------query_builder-------- :", query_builder.where)

      let userDetails = await qb.select(query_builder.columns).from('users U')
        .join('district D', 'D.id = U.district_id', 'left')
        .join('country C', 'C.id = D.country_id', 'left')
        .join('state S', 'S.id = D.state_id', 'left')
        .where({ 'U.id': query_builder.where })
        .get();

      const userImage = await qb.select(['file_path', 'file_mime_type']).where(query_builder.where).get('user_files');
      const serviceDetails = await qb.select(['id', 'job_description', 'service_type', 'scheduled_on', 'status'])
        .where({ customer_id: query_builder.where })
        .order_by('scheduled_on', 'desc')
        .get('service_request');

      const equipmentDetails = await qb.select(['UE.id', 'UE.user_id', 'EB.brand_name', 'UE.month_of_commission', 'UE.month_of_installation', 'UE.month_of_last_service', 'UE.created_at', 'UE.status', 'EC.device_name'])
        .from('user_equipments UE')
        .join('equipment_category EC', 'EC.id=UE.equipment_category_id', 'left')
        .join('equipment_brand EB', 'EB.id=UE.brand_id', 'left')
        .where({ user_id: query_builder.where })
        .order_by('created_at', 'desc')
        .get()

      const serviceVendorDetails = await qb.select(['id', 'job_description', 'service_type', 'scheduled_on', 'status'])
        .where({ vendor_id: query_builder.where })
        .order_by('scheduled_on', 'desc')
        .get('service_request');

      const vendorEquipment = await qb.select('*')
        .where({ vendor_id: query_builder.where, status: [0, 1] })
        .order_by('created_on', 'desc')
        .get('equipment_contact_details');

      let vendor_brand_columns = 'EB.id as brand_id,EB.equipment_name,EB.brand_name'
      const vendor_brands = await qb.select(vendor_brand_columns)
        .from('equipment_contact_details VE')
        .join('equipment_brand EB', 'EB.id = VE.equipment_brand_id', 'left')
        .where({ 'VE.vendor_id': query_builder.where, 'VE.status': [0, 1], 'EB.status': [0, 1] })
        .get()

      if (userImage.length != 0) {
        var img = fs.readFileSync(userImage[0].file_path);
        encode_image = img.toString('base64');

        if (userDetails[0].user_type === "User") {
          result_data = {
            user_details: userDetails,
            vendor_equipment: vendorEquipment,
            service_details: serviceDetails,
            equipment_details: equipmentDetails,
            user_image: `data:${userImage[0].file_mime_type};base64,` + encode_image
          }
        } else {
          result_data = {
            user_details: userDetails,
            brand_list: vendor_brands,
            vendor_equipment: vendorEquipment,
            service_details: serviceVendorDetails,
            user_image: `data:${userImage[0].file_mime_type};base64,` + encode_image
          }
        }

        return result_data;
      }

      if (userDetails[0].user_type === "User") {
        result_data = {
          user_details: userDetails,
          vendor_equipment: vendorEquipment,
          service_details: serviceDetails,
          equipment_details: equipmentDetails,
          user_image: null
        }
      } else {
        result_data = {
          user_details: userDetails,
          brand_list: vendor_brands,
          vendor_equipment: vendorEquipment,
          service_details: serviceVendorDetails,
          user_image: null
        }
      }
      return result_data;



    } else {
      if (query_builder.type === 'User' || query_builder.type === "Admin") {
        result_data = await qb.select(query_builder.columns).where(query_builder.where).order_by('created_at', 'desc').get('users');

      } else {
        console.log("---- vendor extra else -----")
        console.log("----- in else -------- :", query_builder)

        let columns = 'U.id,U.user_name, U.email, U.phone_no, U.address_1, U.address_2, U.company_name,  U.user_type,  U.status,  U.created_at,  U.location,  U.lattitude,  U.longitude, eb.brand_name , eb.id as brand_id, ec.device_name'

        let users = await qb.select(columns).from('users U')
          .join('equipment_contact_details ecd', 'ecd.vendor_id = U.id', 'left')
          .join('equipment_brand eb', 'eb.id = ecd.equipment_brand_id', 'left')
          .join('equipment_category ec', 'ec.id = ecd.equipment_category_id', 'left')
          .where(query_builder.where)
          .order_by('U.created_at', 'desc')
          .get();

        // console.log("-------Vendor based search-------- :", users)

        const key = 'id';

        result_data = [...new Map(users.map(item =>
          [item[key], item])).values()];

      }
    }


    return result_data;

  } catch (err) {
    if (err) {
      console.log("----- err ------ :", err)
      return err;
    }
  } finally {
    qb.release();
  }
}

User.updateByAdmin = async (query_builder, result) => {
  const qb = await sql.get_connection();
  try {
    const result_data = await qb.update('users', query_builder.data, query_builder.where)
    // console.log("--------result_data-------- :", result_data)

    return result_data;
  } catch (err) {
    if (err) {
      return err;
    }
  } finally {
    qb.release();
  }
}



module.exports = User;
