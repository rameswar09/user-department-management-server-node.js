const formRequestModel = require('../db/models/index').fromRequest
const commonDBServices = require('../common_services/db_common_sevices')
const _ = require('lodash')
const shortid = require('shortid');


const formObj = (body) => {
    let obj = {
        id: shortid.generate(),
        assigned_to: body.assigned_user_code || "",
        assigned_user_name: body.assigned_user_name || "",
        created_by: body.user_code || "",
        created_by_name: body.user_name || "",
        department: body.department_id || "",
        dept_name: body.dept_name || "",
        status: false, //processed or not
        active: true, // unique 
        approved: false, // only apporved is true,
        msg: body.msg
    }
    return obj
}

const createFromRequest = async (req, res) => {
    try {
        let mgsObj = {
            error: "",
            status: 200,
            data: {}
        }
        let formBody = req.body
        let formRequestObj = formObj(formBody)
        let createNewRequest = await commonDBServices.INSERT_ONE(formRequestModel, [formRequestObj])
        if (_.isEmpty(createNewRequest)) {
            mgsObj.error = "Error while create new request"
            res.json(mgsObj)
        } else {
            mgsObj.data = createNewRequest
            res.json(mgsObj)
        }
    } catch (e) {
        console.log("error occor while createFromRequest" + e)
        mgsObj.error = e
        res.json(mgsObj)
    }
}
module.exports = {
    CREATE_NEW_REQUEST: createFromRequest
}