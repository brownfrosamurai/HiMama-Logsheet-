const express = require('express')
const router = express.Router()

const { ensureAuth } = require('../middleware/auth')

const Timelog = require('../models/Timelog')

// @desc       Show create page 
// @route      GET /timelogs/create
router.get('/create', ensureAuth, (req, res) => {
    res.render('timelogs/create')
})

// @desc       Clock user out
// @route      POST /timelogs
router.post('/', ensureAuth, async (req, res) => {
    try {
        const payload = {
            user: req.user.id,
            clockout: Date.now(),
            description: req.body.description
        }

        if(!req.body.description) {
            return res.render('errors/400', {
                error: "Missing required parameters"
            })
        }

        const timelogs = await Timelog.find({ user: req.user.id })

        let openLogs = []

        timelogs.filter((log) => {
            if (log.status === false) {
                openLogs.push(log)
            }
            return openLogs
        })

        if (openLogs.length > 0) {
            console.error('User is currently clocked out')
            return res.render('errors/400', {
                error: 'User is currently clocked out'
            })
        }
        await Timelog.create(payload)

        res.redirect('/dashboard')

    } catch (error) {
        console.error(error)
        res.render('errors/500')
    }
})

// @desc       Clock back in
// @route      POST /timelogs/:id
router.post('/:id', ensureAuth, async (req, res) => {
    try {
        const timelog = await Timelog.findById(req.params.id)
      
        if (req.user.id != timelog.user) {
            console.error('User not authorized to access this resource')
            return res.render('errors/401', {
                error: 'User is not authorized to access this resource'
            })
        }

        if (timelog.status === true) {
            console.error('User already clocked in')
            return res.render('errors/400', {
                error: 'User is already clocked in'
            })
        }

        await Timelog.findByIdAndUpdate(req.params.id, {
            clockin: Date.now(),
            status: true
        })

        res.redirect('/dashboard')

    } catch (error) {
        console.error(error)
        res.render('errors/500')
    }
})

// @desc       User dashboard
// @route      GET /timelogs
router.get('/', ensureAuth, async (req, res) => {
    try {
        const timelogs = await Timelog.find()
            .populate('user')
            .sort({ clockout: 'desc' })
            .lean()

        res.status(200).render('timelogs/index', {
            timelogs
        })
    } catch (error) {
        console.error(error)
        res.status(200).render('errors/500')
    }
})

module.exports = router