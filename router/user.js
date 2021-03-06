const express = require('express')
const router = new express.Router()
const multerPhotoUplaod = require('../common_services/app.utils').photoUplaod

const userRouterCustom = require('../router_custom/user_router_custom')


//routers
router.post('/login', userRouterCustom.LOGIN_USER)
router.post('/sign_up', userRouterCustom.SIGN_UP_USER)
router.post('/reset_password', userRouterCustom.RESET_PASSWORD)
router.post('/update_photo/:id', multerPhotoUplaod.single('profile_photo'), userRouterCustom.UPDATE_PHOTO)




module.exports = router
