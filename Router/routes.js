const express = require('express')

const userController = require('../Controllers/userController')
const fbController = require('../Controllers/fbController')
const hstlController = require('../Controllers/hstlController')

const router = new express.Router()

//registration api
router.post('/register',userController.register)

//login api
router.post('/login',userController.login)

//get all users
router.get('/users',userController.allUsers)

//delete user
router.delete('/remove-user/:_id',userController.deluser)

//add feedbacks
router.post('/feedback',fbController.addfb)

//get feedbacks
router.get('/allfb',fbController.getfb)

//delete feedback
router.delete('/remove-fb/:id',fbController.delfb)

//add hstls
router.post('/addhstl',hstlController.addHstl)

//get all hstls
router.get('/getAllHstls',hstlController.getAllHstls)

//get one hstl
router.get('/getOneHstl/:id',hstlController.getOneHstl)

//get hstls by address
router.get('/getHstl/:address',hstlController.getHstlsByAddress)

//get hstl by search
router.get('/:category/:address',hstlController.getHstlsCatandAdd)

//edit hstl
router.put('/edithstl/:_id',hstlController.editHstl)

//del hstl
router.delete('/remove-hstl/:_id',hstlController.delHstl)

module.exports = router