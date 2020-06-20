const express = require('express')
const router = new express.Router()

const commonRouterCustom = require('../router_custom/common_router_custom')


router.get('/getDeptVsUsers', commonRouterCustom.GET_DEPT_WISE_USER)
router.get('/getFormReqs', commonRouterCustom.GET_ALL_UESRS_FORM_REQUEST_DATA)

module.exports = router