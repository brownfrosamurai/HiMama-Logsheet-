const mongoose = require('mongoose')

const TimelogSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    clockout: {
        type: Date,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    },
    clockin: {
        type: Date
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('Timelog', TimelogSchema)