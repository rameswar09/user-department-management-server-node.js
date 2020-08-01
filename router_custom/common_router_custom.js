const models = require('../db/models/index')
const commonDBServices = require('../common_services/db_common_sevices')
const _ = require('lodash')
const shortid = require('shortid');

const formRequestQuery = () => {
    let queryObj = {
        approved: { approved: true, active: true },
        pending: { status: false, active: true },
        reject: { status: true, approved: false, active: true }
    }
    return (reqId, deptId, userCode) => {
        let query = { ...queryObj[reqId] }
        query.department = deptId
        query.assigned_to = userCode
        return query
    }
}

const queryForNotifications = formRequestQuery()


const formDeptVsUser = (allUsers, allDept) => {
    let groupByDept = _.groupBy(allUsers, "department")
    _.forEach(allDept, (dept) => {
        let users = _.get(groupByDept, dept.id, [])
        _.set(dept, 'users', users)
    })
    return allDept
}
const getDeptWiseUsers = async (req, res) => {
    try {
        let mgsObj = {
            error: "",
            status: 200,
            data: {}
        }
        let allUsers = await commonDBServices.FIND_ALL(models.user, {})
        let allDept = await commonDBServices.FIND_ALL(models.department, {})
        let data = formDeptVsUser(allUsers, allDept)
        if (data) {
            mgsObj.data = data
            res.json(mgsObj)
        } else {
            mgsObj.error = "deptVsUsers are not found"
            res.json(mgsObj)
        }

    } catch (e) {
        console.log("Error while getting getDepWiseUsers" + e)
        mgsObj.error = e
        res.json(mgsObj)
    }
}
const fromAllNotificationsRequestsObj = (allNotificationsRequests, getAllUserByDeptId) => {
    let groupByUserNotification = _.groupBy(allNotificationsRequests, "created_by")
    let groupByUserDetails = _.groupBy(getAllUserByDeptId, 'code')
    let data = {
        groupByUserNotification,
        groupByUserDetails
    }
    return data;
}
const getUserVSFormRequestData = async (req, res) => {
    try {
        let mgsObj = {
            error: "",
            status: 200,
            data: {}
        }
        let reqBody = req.body
        let query = queryForNotifications(reqBody.code, reqBody.dept_code, reqBody.assigned_to)
        let allNotificationsRequests = await commonDBServices.FIND_ALL(models.fromRequest, query)
        // let getAllUserByDeptId = await commonDBServices.FIND_ALL(models.user, { department: reqBody.dept_code })
        // let data = fromAllNotificationsRequestsObj(allNotificationsRequests, getAllUserByDeptId)
        if (allNotificationsRequests) {
            mgsObj.data = allNotificationsRequests
            res.json(mgsObj)
        } else {
            const getUserVSFormRequestData = async (req, res) => {
                mgsObj.error = "Not found getUserVSFormRequestData"
                res.json(mgsObj)
            }
        }
    } catch (e) {
        console.log("Error while getUserVSFormRequestData" + e)
        mgsObj.error = e
        res.json(mgsObj)
    }
}

const formRequestUpdateQuery = () => {
    let queryObj = {
        approved: { approved: true, active: true, status: true },
        reject: { status: true, approved: false, active: true }
    }
    return (reqId) => {
        let query = { ...queryObj[reqId] }
        return query
    }
}
const getUpdateReqQuery = formRequestUpdateQuery()
const updateRequest = async (req, res) => {
    try {
        let mgsObj = {
            error: "",
            status: 200,
            data: {}
        }
        let reqBody = req.body;
        let uniqeId = { id: reqBody.req_id }
        let setObj = getUpdateReqQuery(reqBody.submit_id)
        let allNotificationsRequests = await commonDBServices.UPDATE_BY_ID(models.fromRequest, uniqeId, setObj)
        let notificationDetails = await commonDBServices.FIND_ALL(models.fromRequest, uniqeId)

        if (notificationDetails) {
            mgsObj.data = notificationDetails[0]
        }
        res.json(mgsObj)
    } catch (e) {
        console.log("Error while getUserVSFormRequestData" + e)
        mgsObj.error = e
        res.json(mgsObj)
    }

}


module.exports = {
    GET_DEPT_WISE_USER: getDeptWiseUsers,
    GET_ALL_UESRS_FORM_REQUEST_DATA: getUserVSFormRequestData,
    UPDATE_REQ: updateRequest
}