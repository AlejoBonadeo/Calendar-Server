const moment = require("moment")

const isDate = (value) => {
    return value && moment(value).isValid()
}

module.exports = isDate