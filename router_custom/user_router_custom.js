const userModel = require('../db/models/index').user
const commonDBServices = require('../common_services/db_common_sevices')
const _ = require('lodash')
const shortid = require('shortid');
const appUtils = require('../common_services/app.utils')
const sharp = require('sharp')

var string = ""
const fromUserObj = async (body) => {
    let obj = {
        code: shortid.generate(),
        name: body.name || "",
        email: body.email || "",
        password: body.password || "",
        department: body.department || "",
        dept_name:body.dept_name,
        tokens: [],
        disabled: false
    }
    await appUtils.createHashPassword(obj)
    obj = appUtils.generateAuthToken(obj)
    return obj
}
const userLogin = async (req, res) => {
    let mgsObj = {
        error: "",
        status: 200,
        data: {}
    }
    try {
        
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
    let mgsObj = {
        error: "",
        status: 200,
        data: {}
    }
    try {
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
            newUser = new userModel(newUser)
            await newUser.save()
            mgsObj.data = newUser
            // appUtils.sendEmailToUser(requestBody.email)
            res.json(mgsObj)
        }
    } catch (e) {
        console.log("error occord=============>" + e)
        mgsObj.error = "Error occor please try to login again"
        res.json({})
    }
}

const resetPassWord = async (req, res) => {
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
            mgsObj.error = "User is not exist"
            res.json(mgsObj)
        } else {
            await appUtils.createHashPassword(requestBody)
            let setObj = {
                password: requestBody.password
            }
            let updateUser = await commonDBServices.UPDATE_BY_ID(userModel, query, setObj)
            mgsObj.data = updateUser
            if (updateUser) {
                res.json(mgsObj)
            } else {
                res.json(mgsObj)
            }
        }
    } catch (e) {
        mgsObj.error = "Error occor please try again"
        res.json({})
    }
}
const updatePhoto = async(req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    res.set('Content-Type', 'image/png')
    res.send(buffer)
    console.log("hello this is the demo")
}
module.exports = {
    LOGIN_USER: userLogin,
    SIGN_UP_USER: userSignUp,
    RESET_PASSWORD: resetPassWord,
    UPDATE_PHOTO: updatePhoto
}
