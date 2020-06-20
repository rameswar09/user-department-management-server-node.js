const express = require('express')
const formRequestRouterCustom = require('../router_custom/form_router_custom')
const router = new express.Router()

router.post('/new_form_req', formRequestRouterCustom.CREATE_NEW_REQUEST)

module.exports = router
