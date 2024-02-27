const express = require('express')
const router = new express.Router()
const multerPhotoUplaod = require('../common_services/app.utils').photoUplaod

const userRouterCustom = require('../router_custom/user_router_custom')


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User Login.
 *     description: User Login to the system.
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         description: The user to login.
 *         schema:
 *           type: object
 *           required:
 *              - email
 *           properties:
 *             email:
 *              type: string
 *             password:
 *               type: string

 *     responses:
 *       200:
 *         description: Success
 * 
 */
router.post('/login', userRouterCustom.LOGIN_USER)
/**
 * @swagger
 * /user/sign_up:
 *   post:
 *     summary: User Sign Up.
 *     description: User should sign up.
 *     parameters:
 *       - in: body
 *         name: user
 *         required: true
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *              - email
 *           properties:
 *             email:
 *              type: string
 *             password:
 *               type: string
 *             name:
 *              type: string
 *             department:
 *               type: string

 *     responses:
 *       200:
 *         description: Success
 * 
 */
router.post('/sign_up', userRouterCustom.SIGN_UP_USER)
/**
 * @swagger
 * /user/reset_password:
 *   post:
 *     description: Reset password
 *     responses:
 *       200:
 *         description: Success
 * 
 */
router.post('/reset_password', userRouterCustom.RESET_PASSWORD)
router.post('/update_photo/:id', multerPhotoUplaod.single('profile_photo'), userRouterCustom.UPDATE_PHOTO)




module.exports = router
