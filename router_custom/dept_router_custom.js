const deptModel = require('../db/models/index').department
const commonDBServices = require('../common_services/db_common_sevices')
const _ = require('lodash')
const shortid = require('shortid');


const formDept = (body) => {
    let obj = {
        id: shortid.generate(),
        name: body.name
    }
    return obj
}
const createDept = async (req, res) => {
    try {
        let mgsObj = {
            error: "",
            status: 200,
            data: {}
        }
        let deptReqBody = req.body
        let query = {
            name: deptReqBody.name
        }
        let checkDept = await commonDBServices.GET_BY_ID(deptModel, query)
        if (!_.isEmpty(checkDept)) {
            mgsObj.error = "Dept is already exist"
            res.json(mgsObj)
        } else {
            let newDept = formDept(deptReqBody)
            let createNewDept = await commonDBServices.INSERT_ONE(deptModel, [newDept])
            if (createNewDept) {
                mgsObj.data = createNewDept
                res.json(mgsObj)
            } else {
                mgsObj.error = "Error occor while inserting inrto the db"
                res.json(mgsObj)
            }
        }
    } catch (e) {
        console.log("Error occoured while createDept" + e)
        mgsObj.error = e
        res.json(mgsObj)
    }
}

const getAllDept= async(req,res)=>{
  try{
    let mgsObj = {
        error: "",
        status: 200,
        data: {}
    }
    let getAllDept= await commonDBServices.FIND_ALL(deptModel,{})
    if(getAllDept){
      mgsObj.data=getAllDept
      res.json(mgsObj)
    }else {
      mgsObj.error="could not fount all dept";
      res.json(mgsObj)
    }
  }catch(e){
    console.log("error while detching all dept"+e)
    mgsObj.error= "error while detching all dept"
      res.json(mgsObj)
  }
}








module.exports = {
    CREATE_DEPT: createDept,
    GET_ALL_DEPT:getAllDept
}
