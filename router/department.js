const express = require('express')
const router = new express.Router()
const deptRouterCustom = require('../router_custom/dept_router_custom')

router.get('/new_department', deptRouterCustom.CREATE_DEPT)
router.get('/get_all_dept',deptRouterCustom.GET_ALL_DEPT)

module.exports = router
