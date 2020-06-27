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
    return (reqId, deptId) => {
        let query = { ...queryObj[reqId] }
        query.department = deptId
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
    let groupByUser = _.groupBy(allNotificationsRequests, "created_by")
    _.forEach(getAllUserByDeptId, (eachUser) => {
        let getUserWiseNotifications = _.get(getAllUserByDeptId, eachUser.code, [])
        _.set(eachUser, 'form_req', getUserWiseNotifications)
    })
    return getAllUserByDeptId
}
const getUserVSFormRequestData = async (req, res) => {
    try {
        let mgsObj = {
            error: "",
            status: 200,
            data: {}
        }
        let reqBody = req.body
        let query = queryForNotifications(reqBody.code, reqBody.dept_code)
        let allNotificationsRequests = await commonDBServices.FIND_ALL(models.fromRequest, query)
        let getAllUserByDeptId = await commonDBServices.FIND_ALL(models.user, { department: reqBody.dept_code })
        let data = fromAllNotificationsRequestsObj(allNotificationsRequests, getAllUserByDeptId)
        if (data) {
            mgsObj.data = data
            res.json(data)
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




module.exports = {
    GET_DEPT_WISE_USER: getDeptWiseUsers,
    GET_ALL_UESRS_FORM_REQUEST_DATA: getUserVSFormRequestData
}