const moment = require('moment')

function formatDate(date, format) {
    return moment(date).format(format)
}

module.exports = {
    formatDate,
}