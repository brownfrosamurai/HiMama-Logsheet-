const express = require('express')
const router = express.Router()

const { ensureAuth, ensureGuest } = require('../middleware/auth')

const Timelog = require('../models/Timelog')

// @desc       Login/Landing page 
// @route      GET / 
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// @desc       Dashboard
// @route      GET /dashboard
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const timelogs = await Timelog.find({ user: req.user.id })
        .lean()
        .sort({ clockout: 'desc' })

        res.render('dashboard', {
            name: req.user.firstName,
            timelogs
        })
    } catch (error) {
        console.error(error)
        res.render('errors/500')
    }
})

module.exports = router