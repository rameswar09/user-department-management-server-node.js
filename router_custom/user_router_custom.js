const userModel = require('../db/models/index').user
const commonDBServices = require('../common_services/db_common_sevices')
const _ = require('lodash')
const shortid = require('shortid');
const appUtils = require('../common_services/app.utils')


const fromUserObj = async (body) => {
    let obj = {
        code: shortid.generate(),
        name: body.name || "",
        email: body.email || "",
        password: body.password || "",
        department: body.department || "",
        tokens: [],
        disabled: false
    }
    await appUtils.createHashPassword(obj)
    obj = appUtils.generateAuthToken(obj)
    return obj
}
const userLogin = async (req, res) => {
    try {
        let mgsObj = {
            error: "",
            status: 200,
            data: {}
        }
        let requestBody = req.body
        var query = {
            email: requestBody.email
        }
        let checkUser = await commonDBServices.GET_BY_ID(userModel, query)
        if (_.isEmpty(checkUser)) {
            mgsObj.error = "User not found Please sign up"
        } else {
            let isMatch = await appUtils.checkUserPassword(checkUser, requestBody.password)
            if (isMatch) {
                mgsObj.data = checkUser
            } else {
                mgsObj.error = "Password wrong"
            }
        }
        res.json(mgsObj)
    } catch (e) {
        console.log("error====================" + e)
        mgsObj.error = "Error occor please try to login again"
        res.json(mgsObj)
    }
}
const userSignUp = async (req, res) => {
    try {
        let mgsObj = {
            error: "",
            status: 200,
            data: {}
        }
        let requestBody = req.body
        var query = {
            email: requestBody.email
        }
        let checkUser = await commonDBServices.GET_BY_ID(userModel, query)
        if (!_.isEmpty(checkUser)) {
            mgsObj.error = "User is already exist please login"
            res.json(mgsObj)
        } else {
            let newUser = await fromUserObj(req.body)

            let createUser = await commonDBServices.INSERT_ONE(userModel, [newUser])

            mgsObj.data = createUser[0]
            appUtils.sendEmailToUser()
            if (createUser) {
                res.json(mgsObj)
            } else {
                res.json(mgsObj)
            }
        }
    } catch (e) {
        console.log("error occord=============>" + e)
        mgsObj.error = "Error occor please try to login again"
        res.json({})
    }
}

module.exports = {
    LOGIN_USER: userLogin,
    SIGN_UP_USER: userSignUp
}
